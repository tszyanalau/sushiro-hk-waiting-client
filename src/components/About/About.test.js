import React from 'react';
import { render } from '@testing-library/react';
import About from '.';

describe('About Component', () => {
  it('renders title and description correctly', () => {
    const { getByText } = render(
      <About />,
    );
    expect(getByText('關於香港壽司郎等侯組數地圖')).toBeInTheDocument();
    expect(getByText('本網站引用香港壽司郎官方應用程式的資料，顯示各分店的等侯組數，由香港壽司郎的愛好者個人經營。')).toBeInTheDocument();
  });

  it('renders disclaimer list correctly', () => {
    const { container } = render(
      <About />,
    );

    const disclaimers = ['本網站與壽司郎無任何關係。'];
    const disclaimerItems = container.querySelectorAll('li');
    expect(disclaimerItems).toHaveLength(1);
    disclaimerItems.forEach((item, index) => {
      expect(item).toHaveTextContent(disclaimers[index]);
    });
  });
});
