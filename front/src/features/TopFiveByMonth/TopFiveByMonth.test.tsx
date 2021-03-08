import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopFiveByMonth } from './TopFiveByMonth';
import { act } from 'react-dom/test-utils';

import { mockUseAsync } from '../../setupTests';

describe('renders TopFiveByMonth component correctly', () => {
  it('renders TopFiveByMonth header', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: true,
      mockErrorMessage: '',
      mockResult: {},
    });
    await act(async () => {
      render(<TopFiveByMonth />);
    });
    const headerElement = screen.getByText(
      'The Top 5 most contacted listings per Month'
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
      render(<TopFiveByMonth />);
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
      render(<TopFiveByMonth />);
    });
    const errorElement = screen.getByText('error message');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders top five by month table if there is data', async () => {
    jest.clearAllMocks();
    mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {
        data: [
          {
            month: '2020-05',
            listings: [
              {
                ranking: 1001,
                id: 1002,
                make: 'TestMake',
                price: 1003,
                mileage: 1004,
                contacts: 1005,
              },
            ],
          },
        ],
      },
    });

    await act(async () => {
      render(<TopFiveByMonth />);
    });

    const monthElement = screen.getByText('2020-05');
    expect(monthElement).toBeInTheDocument();

    const rankingHeaderElement = screen.getByText('Ranking');
    expect(rankingHeaderElement).toBeInTheDocument();

    const listingIdHeaderElement = screen.getByText('Listing Id');
    expect(listingIdHeaderElement).toBeInTheDocument();

    const makeHeaderElement = screen.getByText('Make');
    expect(makeHeaderElement).toBeInTheDocument();

    const priceHeaderElement = screen.getByText('Selling Price');
    expect(priceHeaderElement).toBeInTheDocument();

    const mileageHeaderElement = screen.getByText('Mileage');
    expect(mileageHeaderElement).toBeInTheDocument();

    const contactsHeaderElement = screen.getByText('# of Contacts');
    expect(contactsHeaderElement).toBeInTheDocument();

    const rankingValueElement = screen.getByText('1001');
    expect(rankingValueElement).toBeInTheDocument();

    const listingIdValueElement = screen.getByText('1002');
    expect(listingIdValueElement).toBeInTheDocument();

    const makeValueElement = screen.getByText('TestMake');
    expect(makeValueElement).toBeInTheDocument();

    const priceValueElement = screen.getByText('€1.003,-');
    expect(priceValueElement).toBeInTheDocument();

    const mileageValueElement = screen.getByText('1.004 KM');
    expect(mileageValueElement).toBeInTheDocument();

    const contactsValueElement = screen.getByText('1005');
    expect(contactsValueElement).toBeInTheDocument();
  });

  it('calls mockedUseAsync', async () => {
    jest.clearAllMocks();
    const mockedUseAsync = mockUseAsync({
      mockLoading: false,
      mockErrorMessage: '',
      mockResult: {},
    });

    await act(async () => {
      render(<TopFiveByMonth />);
    });

    expect(mockedUseAsync.mock.calls.length).toBe(1);
  });
});
