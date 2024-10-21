import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Budget Planner Tests', () => {
  
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
  })

  test('Create Expense', () => {
    const nameInput = screen.getByLabelText('Name');
    const costInput = screen.getByLabelText('Cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Test Expense' } });
    fireEvent.change(costInput, { target: { value: '100' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Test Expense')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    
    expect(screen.getByText(/Spent so far: \$100/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$900/)).toBeInTheDocument();
  });

  test('Delete an expense', () => {

    const nameInput = screen.getByLabelText('Name');
    const costInput = screen.getByLabelText('Cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Test Expense' } });
    fireEvent.change(costInput, { target: { value: '100' } });
    fireEvent.click(saveButton);

    const deleteButton = screen.getByText('x');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Expense')).not.toBeInTheDocument();

    expect(screen.getByText(/Spent so far: \$0/)).toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$1000/)).toBeInTheDocument();
  });

  test('Verify Budget Balance', () => {
    const addExpense = (name: string, cost: string) => {
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: name } });
      fireEvent.change(screen.getByLabelText('Cost'), { target: { value: cost } });
      fireEvent.click(screen.getByText('Save'));
    };

    addExpense('Test Expense 1', '100');
    addExpense('Test Expense 2', '200');

    const budgetText = screen.getByText(/Budget: \$(\d+)/).textContent;
    const remainingText = screen.getByText(/Remaining: \$(\d+)/).textContent;
    const spentText = screen.getByText(/Spent so far: \$(\d+)/).textContent;

    const budget = parseInt(budgetText!.match(/\d+/)![0]);
    const remaining = parseInt(remainingText!.match(/\d+/)![0]);
    const spent = parseInt(spentText!.match(/\d+/)![0]);
    expect(budget).toBe(remaining + spent);

  });

})


