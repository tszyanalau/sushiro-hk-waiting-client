import React from 'react';
import { render } from '@testing-library/react';
import Icon from '.';

describe('Icon Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Icon type="heart" />);
    const iconElement = container.querySelector('i');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('bi');
    expect(iconElement).toHaveClass('bi-heart');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon className="custom-icon" type="star" />);
    const iconElement = container.querySelector('i');
    expect(iconElement).toHaveClass('custom-icon');
  });
});
