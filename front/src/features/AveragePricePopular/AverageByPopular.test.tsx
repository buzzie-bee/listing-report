import React from 'react';
import { render, screen } from '@testing-library/react';
import { AveragePricePopular } from './AveragePricePopular';
import { act } from 'react-dom/test-utils';
import { mockUseAsync } from '../../setupTests';

describe('renders AveragePricePopular component correctly', () => {
  it('renders AveragePricePopular header', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<AveragePricePopular />);
    });

    const headerElement = screen.getByText(
      'Average price of the 30% most contacted listings'
    );
    expect(headerElement).toBeInTheDocument();
  });

  it('initially renders loading', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<AveragePricePopular />);
    });
    const loadingElement = screen.getByText('Loading');
    expect(loadingElement).toBeInTheDocument();
  });

  it('shows an error if there is an error', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: false,
      mockErrorMessage: 'error message',
      mockResult: {},
    });

    await act(async () => {
      render(<AveragePricePopular />);
    });
    const errorElement = screen.getByText('error message');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders average popular price table if there is data', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {
        averagePrice: 101,
      },
    });

    await act(async () => {
      render(<AveragePricePopular />);
    });

    const tableHeaderElement = screen.getByText('Average Price');
    expect(tableHeaderElement).toBeInTheDocument();
    const averagePriceValueElement = screen.getByText('€101,-');
    expect(averagePriceValueElement).toBeInTheDocument();
  });

  it('calls mockedUseAsync', async () => {
    jest.clearAllMocks();
    const mockedUseAsync = mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<AveragePricePopular />);
    });

    expect(mockedUseAsync.mock.calls.length).toBe(1);
  });
});
