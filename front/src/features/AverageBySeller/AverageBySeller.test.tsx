import React from 'react';
import { render, screen } from '@testing-library/react';

import { AverageBySeller } from './AverageBySeller';
import { act } from 'react-dom/test-utils';
import { mockUseAsync } from '../../setupTests';

describe('renders AverageBySeller component correctly', () => {
  it('renders Average by Seller header', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<AverageBySeller />);
    });

    const headerElement = screen.getByText(
      'Average Listing Selling Price per Seller Type'
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
      render(<AverageBySeller />);
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
      render(<AverageBySeller />);
    });
    const errorElement = screen.getByText('error message');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders average seller table if there is data', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {
        dealer: 101,
        private: 102,
        other: 103,
      },
    });

    await act(async () => {
      render(<AverageBySeller />);
    });

    const dealerElement = screen.getByText('dealer');
    expect(dealerElement).toBeInTheDocument();
    const dealerValueElement = screen.getByText('€101,-');
    expect(dealerValueElement).toBeInTheDocument();

    const privateElement = screen.getByText('private');
    expect(privateElement).toBeInTheDocument();
    const privateValueElement = screen.getByText('€102,-');
    expect(privateValueElement).toBeInTheDocument();

    const otherElement = screen.getByText('other');
    expect(otherElement).toBeInTheDocument();
    const otherValueElement = screen.getByText('€103,-');
    expect(otherValueElement).toBeInTheDocument();
  });

  it('calls mockedUseAsync', async () => {
    jest.clearAllMocks();
    const mockedUseAsync = mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {
        dealer: 101,
        private: 102,
        other: 103,
      },
    });

    await act(async () => {
      render(<AverageBySeller />);
    });

    expect(mockedUseAsync.mock.calls.length).toBe(1);
  });
});
