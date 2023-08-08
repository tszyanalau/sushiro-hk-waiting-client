import React from 'react';
import { render } from '@testing-library/react';
import LocalTicketing from './LocalTicketing';

describe('LocalTicketing component', () => {
  it('renders with open and localTicketing true', () => {
    const { getByText, container } = render(
      <LocalTicketing localTicketing open />,
    );
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-check-lg');
    expect(getByText('接受取票')).toBeInTheDocument();
  });

  it('renders with open true and localTicketing false', () => {
    const { getByText, container } = render(
      <LocalTicketing localTicketing={false} open />,
    );
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-x');
    expect(getByText('已停止取票')).toBeInTheDocument();
  });

  it('renders with open false and localTicketing true', () => {
    const { getByText, container } = render(
      <LocalTicketing localTicketing={false} open />,
    );
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-x');
    expect(getByText('已停止取票')).toBeInTheDocument();
  });

  it('renders with open and localTicketing false', () => {
    const { getByText, container } = render(
      <LocalTicketing localTicketing={false} open />,
    );
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('bi-x');
    expect(getByText('已停止取票')).toBeInTheDocument();
  });
});
