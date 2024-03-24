import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { deleteCategory } from '../endpoints/categories';
import Categories from './components/CategoriesTable';

// Mock da função deleteCategory
jest.mock('../endpoints/categories', () => ({
  deleteCategory: jest.fn(),
}));

describe('Categories Component', () => {
  it('deletes a category when delete button is clicked', async () => {
    // Renderiza o componente
    const { getByText } = render(<Categories />);

    // Simula a chamada à função deleteCategory ao clicar no botão de delete
    fireEvent.click(getByText('Delete'));

    // Espera que a função deleteCategory tenha sido chamada
    await waitFor(() => {
      expect(deleteCategory).toHaveBeenCalled();
    });
  });
});
