import React from 'react';
import { render, screen } from '@testing-library/react';
import { Distribution } from './Distribution';

describe('renders Distribution component correctly', () => {
  it('renders Distribution header', () => {
    render(<Distribution />);
    const headerElement = screen.getByText('Distribution');
    expect(headerElement).toBeInTheDocument();
  });
});
