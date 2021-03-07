import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopFiveByMonth } from './TopFiveByMonth';

describe('renders TopFiveByMonth component correctly', () => {
  it('renders TopFiveByMonth header', () => {
    render(<TopFiveByMonth />);
    const headerElement = screen.getByText('Top five listings');
    expect(headerElement).toBeInTheDocument();
  });
});
