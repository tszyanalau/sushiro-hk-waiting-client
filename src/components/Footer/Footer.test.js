import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('Footer Component', () => {
  it('renders footer content correctly', () => {
    const mockedDate = new Date(1628433753000);
    const originalDate = Date;
    global.Date = jest.fn(() => mockedDate);
    const { getByText } = render(
      <Footer />,
    );
    const disclaimerLink = getByText('免責聲明');
    expect(disclaimerLink).toBeInTheDocument();
    expect(disclaimerLink.tagName).toBe('A');
    expect(getByText('©2021 香港壽司郎等侯組數地圖')).toBeInTheDocument();
    expect(getByText('All rights reserved.')).toBeInTheDocument();
    global.Date = originalDate;
  });
});
