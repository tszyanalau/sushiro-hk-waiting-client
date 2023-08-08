import React from 'react';
import { render } from '@testing-library/react';
import Marker from './Marker';

const waitingGroup = 5;

describe('Marker component', () => {
  it('renders marker when closed', () => {
    const { getByRole } = render(<Marker open={false} waitingGroup={12} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-pill', 'fw-bold', 'marker', 'btn', 'btn-closed', 'btn-sm');
  });

  it('renders marker when open with waiting group and localTicketing', () => {
    const { getByRole } = render(<Marker open waitingGroup={waitingGroup} localTicketing />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-pill', 'fw-bold', 'marker', 'btn', 'btn-tier-1', 'btn-sm');
    expect(button).toHaveTextContent(waitingGroup);
  });

  it('renders marker when open with waiting group but localTicketing is disabled', () => {
    const { getByRole } = render(<Marker open waitingGroup={waitingGroup} localTicketing={false} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-pill', 'fw-bold', 'marker', 'btn', 'btn-tier-1-blocked', 'btn-sm');
    expect(button).toHaveTextContent(waitingGroup);
  });

  it('renders marker when closed and local ticketing is disabled', () => {
    const { getByRole, container } = render(<Marker open={false} waitingGroup={waitingGroup} localTicketing={false} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-pill', 'fw-bold', 'marker', 'btn', 'btn-closed', 'btn-sm');
    expect(container.querySelector('i.bi-x-circle')).toBeInTheDocument();
  });
});
