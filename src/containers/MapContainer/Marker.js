import React from 'react';
import MapButton from '../../components/MapButton';
import Icon from '../../components/Icon';
import { getTierVariant } from '../../service/map';

const Marker = ({ waitingGroup, open, localTicketing }) => {
  let variant;
  if (!open) {
    variant = 'closed';
  } else {
    variant = getTierVariant(waitingGroup);
  }
  if (open && !localTicketing) {
    variant = `${variant}-blocked`;
  }
  return (<MapButton className="marker" variant={variant}>{open ? waitingGroup : <Icon type="x-circle" />}</MapButton>);
};

export default Marker;
