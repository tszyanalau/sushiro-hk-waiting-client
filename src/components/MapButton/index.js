import React from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

const MapButton = ({ children, className, ...props }) => (
  <Button className={classNames('rounded-pill', 'fw-bold', className)} size="sm" {...props}>{children}</Button>
);

export default MapButton;
