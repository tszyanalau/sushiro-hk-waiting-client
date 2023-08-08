import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config.json';
import storeData from '../mockData/store.json';

const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

const appendTimestamp = (data) => {
  data.timestamp = new Date().getTime();
  return data;
};

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: process.env.REACT_APP_MOCK_DATA ? () => { // TODO: normalize api create
    let data = storeData;
    data = appendTimestamp(data);
    return { data };
  }
    : fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (process.env.NODE_ENV === 'development') {
          headers.set('x-api-key', process.env.REACT_APP_API_KEY);
        }
        return headers;
      },
      timeout: config.apiTimeout,
    }),
  endpoints: (builder) => ({
    getStoreList: builder.query({
      query: () => 'store',
      transformResponse: ({ data, ...props }) => {
        return { stores: data, ...props };
      },
    }),
  }),
});

// export hooks for usage in functional components
export const { useGetStoreListQuery } = storeApi;

export const useGetStoreListQuerySubscription = storeApi.endpoints.getStoreList.useQuerySubscription;

export const useGetStoreListQueryStateResult = storeApi.endpoints.getStoreList.useQueryState;
