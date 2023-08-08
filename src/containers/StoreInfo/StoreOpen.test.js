import React from 'react';
import { render } from '@testing-library/react';
import StoreOpen from './StoreOpen';

describe('StoreOpen Component', () => {
  it('displays correct icon and text when open is true', () => {
    const { getByText, container } = render(<StoreOpen open />);
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-door-open');
    expect(getByText('營業中')).toBeInTheDocument();
  });

  it('displays correct icon and text when open is false', () => {
    const { getByText, container } = render(<StoreOpen open={false} />);
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-door-closed');
    expect(getByText('休息中')).toBeInTheDocument();
  });
});
