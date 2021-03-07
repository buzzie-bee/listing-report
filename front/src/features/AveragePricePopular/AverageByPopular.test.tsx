import React from 'react';
import { render, screen } from '@testing-library/react';
import { AveragePricePopular } from './AveragePricePopular';

describe('renders AveragePricePopular component correctly', () => {
  it('renders AveragePricePopular header', () => {
    render(<AveragePricePopular />);
    const headerElement = screen.getByText('Popular listings');
    expect(headerElement).toBeInTheDocument();
  });
});
