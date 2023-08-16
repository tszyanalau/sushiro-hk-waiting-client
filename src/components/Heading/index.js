import React from 'react';
import classNames from 'classnames';

const Heading = ({ className, level = 2, children, gutter = true }) => (
  <div className={classNames('fw-bold', 'text-primary', { 'mb-5': gutter }, `h${level}`, className)}>{children}</div>
);

export default Heading;
