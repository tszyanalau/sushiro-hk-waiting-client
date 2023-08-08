import React, { useState } from 'react';
import { Container, Spinner, Button, Stack } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Loader } from '@googlemaps/js-api-loader';
import classNames from 'classnames';
import _ from 'lodash';
import MapFilter from './MapFilter';
import Marker from './Marker';
import { setStoreId, setShowInfo } from '../../reducers/storeMap';
import { useGetStoreListQuery, useGetStoreListQuerySubscription } from '../../api/store';
import StoreInfo from '../StoreInfo';
import Icon from '../../components/Icon';
import config from '../../config.json';
import { getTier, getDisplayTime, getCenter, getBounds } from '../../service/map';

const MapContainer = ({ t }) => {
  const { isSuccess, isError, data } = useGetStoreListQuery();
  const { refetch } = useGetStoreListQuerySubscription();
  const dispatch = useDispatch();
  const { storeId, selectedTiers } = useSelector((state) => state.storeMap);
  const [zoom, setZoom] = useState(config.map.defaultZoom);
  const [mapCenter, setMapCenter] = useState();
  let hasMapError = false;
  let mapLoaded = false;
  const handleMapError = (e) => {
    console.error(e);
    hasMapError = true;
  };
  if (isSuccess) {
    let { stores } = data;
    let map;
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: 'weekly',
      language: config.map.language,
    });
    const center = getCenter(stores);
    const bounds = getBounds(stores);
    const mapOptions = {
      center: mapCenter || center,
      zoom,
      clickableIcons: false,
      mapId: 'WAITING_GROUPS',
      disableDefaultUI: true,
      zoomControl: true,
      restriction: {
        latLngBounds: bounds,
        strictBounds: false,
      },
    };
    loader
      .importLibrary('maps')
      .then(({ Map }) => {
        map = new Map(document.getElementById('map'), mapOptions);
        if (storeId !== null) {
          map.setZoom(config.map.markerZoom);
          const { latitude, longitude } = _.find(stores, { id: storeId });
          map.panTo({ lat: latitude, lng: longitude });
        }
        map.addListener('zoom_changed', () => {
          setZoom(map.getZoom());
        });
        map.addListener('dragend', () => {
          setMapCenter(map.getCenter());
        });
      })
      .catch(handleMapError);
    loader
      .importLibrary('marker')
      .then(({ AdvancedMarkerElement }) => {
        let marker;
        stores = _.filter(stores, ({ waitingGroup }) => {
          const tier = getTier(waitingGroup);
          return selectedTiers.includes(tier);
        });
        _.each(stores, (store) => {
          const { latitude, longitude, waitingGroup, open, localTicketing } = store;
          const content = document.createElement('div');
          content.innerHTML = ReactDOMServer.renderToString(<Marker waitingGroup={waitingGroup} open={open} localTicketing={localTicketing} />);
          marker = new AdvancedMarkerElement({
            map,
            position: { lat: latitude, lng: longitude },
            content,
          });
          marker.addListener('click', () => {
            dispatch(setShowInfo(true));
            dispatch(setStoreId(store.id));
          });
        });
      })
      .catch(handleMapError);
    mapLoaded = true;
  }
  const { showInfo } = useSelector((state) => state.storeMap);
  const error = hasMapError || isError;
  return (
    <Stack id="map-container" direction="vertical">
      <div id="map-wrapper" className={classNames({ error })}>
        <div id="map" className={classNames({ loading: !mapLoaded && !error, shrink: showInfo, error })} />
        { !mapLoaded && !error && (
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <Spinner animation="border" variant="secondary" size="lg" />
          </div>
        </div>
        ) }
        <StoreInfo />
        <StoreInfo mobile />
        <MapFilter />
      </div>
      { (error || (mapLoaded && !!data)) && (
      <Stack as={Container} fluid direction="horizontal" className={`justify-content-end small text-end text-${error ? 'danger' : 'success'}`}>
        <div>
          {error ? t('error') : t('lastUpdated', { timestamp: getDisplayTime(data.timestamp) })}
        </div>
        <Button variant="link" className="link-primary refresh-btn" onClick={refetch} size="sm">
          <Icon type="arrow-clockwise" className="fs-6" />
        </Button>
      </Stack>
      ) }
    </Stack>
  );
};

export default withTranslation()(MapContainer);
