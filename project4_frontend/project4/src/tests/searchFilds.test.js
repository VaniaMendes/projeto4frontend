import React from 'react';
import { render, act } from '@testing-library/react';
import SearchFields from '../components/SearchFields';
import { getAllCategories } from '../endpoints/categories';
import { getActiveUsers } from '../endpoints/users';
import { userStore } from '../stores/UserStore';

jest.mock('../endpoints/categories', () => ({
  getAllCategories: jest.fn(),
}));

jest.mock('../endpoints/users', () => ({
  getActiveUsers: jest.fn(),
}));

jest.mock('../stores/UserStore', () => ({
  userStore: jest.fn(),
}));

userStore.mockReturnValue({ token: 'testToken' });

describe('SearchFields', () => {
  test('renders the component and calls data fetching functions', async () => {
    getAllCategories.mockResolvedValue([]);
    getActiveUsers.mockResolvedValue([]);
    userStore.mockReturnValue({ token: 'testToken' });


   

    await act(async () => {
      render(<SearchFields />);
    });

    expect(getAllCategories).toHaveBeenCalledWith('testToken');
    expect(getActiveUsers).toHaveBeenCalledWith('testToken');
  });
});