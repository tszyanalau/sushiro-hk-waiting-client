import React from 'react';
import classNames from 'classnames';

const Icon = ({ className, type }) => (
  <i className={classNames(className, 'bi', `bi-${type}`)} />
);

export default Icon;
