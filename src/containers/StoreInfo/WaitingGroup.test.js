import React from 'react';
import { render } from '@testing-library/react';
import WaitingGroup from './WaitingGroup';

describe('WaitingGroup component', () => {
  it('renders with open and waitingGroup greater than 0', () => {
    const { getByText, container } = render(
      <WaitingGroup waitingGroup={5} open />,
    );
    expect(container.querySelector('.text-tier-1')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('renders with open and waitingGroup 0', () => {
    const { queryByText, container } = render(
      <WaitingGroup waitingGroup={0} open />,
    );
    expect(container.querySelector('.text-tier-0')).toBeInTheDocument();
    expect(container.querySelector('i.bi-dash')).toBeInTheDocument();
    expect(queryByText('/0/')).toBeNull();
  });

  it('renders with closed', () => {
    const { queryByText, container } = render(
      <WaitingGroup waitingGroup={5} open={false} />,
    );
    expect(container.querySelector('.text-off')).toBeInTheDocument();
    expect(container.querySelector('i.bi-dash')).toBeInTheDocument();
    expect(queryByText('/5/')).toBeNull();
  });
});
