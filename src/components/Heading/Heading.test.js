import React from 'react';
import { render } from '@testing-library/react';
import Heading from '.';

describe('Heading Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Heading>Hello, World!</Heading>);
    const headingElement = getByText('Hello, World!');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('fw-bold', 'text-primary', 'h2');
  });

  it('applies custom className', () => {
    const { getByText } = render(<Heading className="custom-class">Custom Heading</Heading>);
    const headingElement = getByText('Custom Heading');
    expect(headingElement).toHaveClass('custom-class');
  });

  it('applies gutter when gutter prop by default', () => {
    const { getByText } = render(<Heading>Heading with Gutter</Heading>);
    const headingElement = getByText('Heading with Gutter');
    expect(headingElement).toHaveClass('mb-5');
  });

  it('does not apply gutter when gutter prop is false', () => {
    const { getByText } = render(<Heading gutter={false}>Heading without Gutter</Heading>);
    const headingElement = getByText('Heading without Gutter');
    expect(headingElement).not.toHaveClass('mb-5');
  });

  it('renders different heading levels', () => {
    const { getByText } = render(<Heading level={1}>Heading Level 1</Heading>);
    const headingElement = getByText('Heading Level 1');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('h1');
  });
});
