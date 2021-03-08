import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { mockUseAsync } from './setupTests';
import { act } from 'react-dom/test-utils';

describe('renders App component correctly', () => {
  // Have to mock the fetching hook for each component to prevent api calls
  it('renders App', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<App />);
    });

    const headerElement = screen.getByText('Listings Reporting');
    expect(headerElement).toBeInTheDocument();
  });
});
