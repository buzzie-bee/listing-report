import React from 'react';
import { render, screen } from '@testing-library/react';
import { AverageBySeller } from './AverageBySeller';

describe('renders AverageBySeller component correctly', () => {
  it('renders Average by Seller header', () => {
    render(<AverageBySeller />);
    const headerElement = screen.getByText('Average by seller');
    expect(headerElement).toBeInTheDocument();
  });
});
