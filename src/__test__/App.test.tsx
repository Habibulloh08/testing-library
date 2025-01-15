

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
const renderWithQueryClient = (ui: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
};

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

it('opens and closes the ExchangeModal', async () => {
    renderWithQueryClient(<App />);

    const openModalButton = screen.getByRole('button', {
        name: /open modal/i,
    });
    fireEvent.click(openModalButton);
    const modal = screen.queryByRole('dialog');
    expect(modal).toBeInTheDocument();
    const closeModalButton = screen.getByRole('button', {
        name: /close/i,
    });
    fireEvent.click(closeModalButton);
    await waitFor(() => {
        expect(modal).toHaveStyle('display: none');
    });
});
