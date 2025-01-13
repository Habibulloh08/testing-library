import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoApp from '../components/TodoApp';

describe('TodoApp', () => {
    it('renders input and add button', () => {
        render(<TodoApp />);
        const inputElement = screen.getByRole('textbox');
        const addButton = screen.getByText(/Add Todo/i);
        expect(inputElement).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('adds a new todo', () => {
        render(<TodoApp />);
        const inputElement = screen.getByRole('textbox');
        const addButton = screen.getByText(/Add Todo/i);

        fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
        fireEvent.click(addButton);

        const todoItem = screen.getByText('Test Todo');
        expect(todoItem).toBeInTheDocument();
    });

    it('does not add a todo with empty input', () => {
        render(<TodoApp />);
        const addButton = screen.getByText(/Add Todo/i);

        fireEvent.click(addButton);

        const todoItems = screen.queryAllByRole('listitem');
        expect(todoItems.length).toBe(0);
    });

    it('removes a todo', () => {
        render(<TodoApp />);
        const inputElement = screen.getByRole('textbox');
        const addButton = screen.getByText(/Add Todo/i);

        fireEvent.change(inputElement, { target: { value: 'Delete Me' } });
        fireEvent.click(addButton);

        const deleteButton = screen.getByText('X');
        fireEvent.click(deleteButton);

        const todoItem = screen.queryByText('Delete Me');
        expect(todoItem).not.toBeInTheDocument();
    });
});

it('todo-ni tahrirlaydi', () => {
    render(<TodoApp />);

    // Todo qo'shish
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    // Todo qo'shilganligini tekshirish
    const todoItem = screen.getByText('Test Todo');
    expect(todoItem).toBeInTheDocument();

    // "Edit" tugmasini bosish
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Tahrirlash inputini topish va qiymatini o'zgartirish
    const editInput = screen.getByDisplayValue('Test Todo'); // Tahrirlash uchun mavjud matnni ko'rsatadi
    fireEvent.change(editInput, { target: { value: 'Updated Todo' } });

    // O'zgarishlarni saqlash
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Todo tahrirlanganligini tekshirish
    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
});
