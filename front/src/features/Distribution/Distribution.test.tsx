import React from 'react';
import { render, screen } from '@testing-library/react';
import { Distribution } from './Distribution';
import { mockUseAsync } from '../../setupTests';
import { act } from 'react-dom/test-utils';

describe('renders Distribution component correctly', () => {
  it('renders Distribution header', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<Distribution />);
    });

    const headerElement = screen.getByText(
      'Percentual distribution of available cars by Make'
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
      render(<Distribution />);
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
      render(<Distribution />);
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
        distributionData: [{ make: 'Audi', distribution: 50 }],
      },
    });

    await act(async () => {
      render(<Distribution />);
    });

    const tableHeaderMakeElement = screen.getByText('Make');
    expect(tableHeaderMakeElement).toBeInTheDocument();
    const tableHeaderDistributionElement = screen.getByText('Distribution');
    expect(tableHeaderDistributionElement).toBeInTheDocument();

    const makeElement = screen.getByText('Audi');
    expect(makeElement).toBeInTheDocument();
    const distributionElement = screen.getByText('50%');
    expect(distributionElement).toBeInTheDocument();
  });

  it('calls mockedUseAsync', async () => {
    jest.clearAllMocks();
    const mockedUseAsync = mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<Distribution />);
    });

    expect(mockedUseAsync.mock.calls.length).toBe(1);
  });
});
