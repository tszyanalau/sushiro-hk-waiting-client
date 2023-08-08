import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';
import config from '../../config.json';
import { setSelectedTiers } from '../../reducers/storeMap';
import { getTier, getTierVariant } from '../../service/map';
import { useGetStoreListQueryStateResult } from '../../api/store';
import MapButton from '../../components/MapButton';

const MapFilter = ({ t }) => {
  const { selectedTiers } = useSelector((state) => state.storeMap);
  const { isError, isLoading, data, isUninitialized } = useGetStoreListQueryStateResult();
  const dispatch = useDispatch();
  if (isUninitialized || isError || isLoading) return null;
  return (
    <Stack id="map-filter" direction="horizontal" gap={1}>
      {
        config.tier.map((waitingGroup, i) => {
          const tier = getTier(waitingGroup);
          const selected = selectedTiers.includes(tier);
          let hasTier = (waitingGroup === 0 && _.filter(data.stores, { waitingGroup: 0 }).length > 0);
          let label = t('mapFilter.noWait');
          if (waitingGroup > 0 && waitingGroup < _.max(config.tier)) {
            label = t('mapFilter.groupRange', { min: waitingGroup, max: config.tier[i + 1] - 1 });
            hasTier = _.filter(data.stores, (store) => store.waitingGroup >= waitingGroup && store.waitingGroup <= config.tier[i + 1] - 1).length > 0;
          } else if (waitingGroup >= _.max(config.tier)) {
            label = t('mapFilter.groupMax', { max: config.tier[i] });
            hasTier = _.filter(data.stores, (store) => store.waitingGroup >= _.max(config.tier)).length > 0;
          }
          const variant = selected && hasTier ? getTierVariant(waitingGroup) : 'closed';
          return (
            <MapButton
              key={waitingGroup}
              variant={variant}
              as="input"
              type="button"
              disabled={!hasTier}
              value={label}
              onClick={() => {
                let payload = Array.from(selectedTiers);
                if (selected) {
                  payload = _.filter(selectedTiers, (selectedTier) => selectedTier !== tier);
                } else {
                  payload.push(tier);
                  payload = _.uniq(payload);
                }
                dispatch(setSelectedTiers(payload));
              }}
            />
          );
        })
      }
    </Stack>
  );
};

export default withTranslation()(MapFilter);
