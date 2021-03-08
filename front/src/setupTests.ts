// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import * as reactAsyncHook from 'react-async-hook';

export const mockUseAsync = ({
  mockLoading,
  mockErrorMessage,
  mockResult,
}: {
  mockLoading: boolean;
  mockErrorMessage: string;
  mockResult: any;
}) => {
  return jest.spyOn(reactAsyncHook, 'useAsync').mockImplementation(() => {
    return {
      status: 'not-requested',
      loading: mockLoading,
      error: { name: 'test error', message: mockErrorMessage },
      result: mockResult,
      set: jest.fn(),
      merge: jest.fn(),
      reset: jest.fn(),
      execute: jest.fn(),
      currentPromise: null,
      currentParams: null,
    };
  });
};
