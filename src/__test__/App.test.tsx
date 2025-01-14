

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
    it('renders the main heading', () => {
        render(<App />);
        const heading = screen.getByText(/todo app/i);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('text-red-500');
    });
    it('toggles the TodoApp component', () => {
        render(<App />);
        const button = screen.getByText(/view todo/i);
        fireEvent.click(button);
        const todoApp = screen.getByText(/todo app/i);
        expect(todoApp).toBeInTheDocument();
    });
    it('toggles the Greet component', () => {
        render(<App />);
        const button = screen.getByText(/view greet/i);
        fireEvent.click(button);
        const greet = screen.getByText(/user/i);
        expect(greet).toBeInTheDocument();
    });

    it('toggles the Application component', () => {
        render(<App />);
        const button = screen.getByText(/view application/i);
        fireEvent.click(button);
        const application = screen.getByRole('heading', { name: /application/i });
        expect(application).toBeInTheDocument();
    });
    it('toogles the Skills componet', () => {
        render(<App />);
        const button = screen.getByRole('button', {
            name: /view skills/i
        })
        fireEvent.click(button)
        const skills = screen.getByText(/react/i)
        expect(skills).toBeInTheDocument()
    })
    it('toogles the Counter componet', () => {
        render(<App />);
        const button = screen.getByRole('button', {
            name: /view counter/i
        })
        fireEvent.click(button)
        const skills = screen.getByRole('button', {
            name: /increment/i
        })
        expect(skills).toBeInTheDocument()
    })
});
