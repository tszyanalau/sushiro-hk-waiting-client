import React from 'react';
import { render } from '@testing-library/react';
import MapButton from '.';

describe('MapButton Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<MapButton>Click Me</MapButton>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('rounded-pill', 'fw-bold', 'btn-sm');
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('applies custom className', () => {
    const { container } = render(<MapButton className="custom-class">Custom Button</MapButton>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('passes other props to Button component', () => {
    const { container } = render(<MapButton disabled>Click Me</MapButton>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('applies correct class when passing "variant" prop', () => {
    const { container } = render(<MapButton variant="tier-0">Click Me</MapButton>);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass('btn-tier-0');
  });
});
