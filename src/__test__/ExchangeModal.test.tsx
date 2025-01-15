import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import ExchangeModal from '../components/ExchangeModal';
import { useChangeSwap, useExchangeData } from '../api/Exchange';
import { message } from 'antd';

vi.mock('../api/Exchange', () => ({
    useChangeSwap: vi.fn(),
    useExchangeData: vi.fn(),
}));

describe('ExchangeModal', () => {
    const setExchangeModal = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render ExchangeModal and handle input changes', () => {
        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Check if the modal renders correctly
        expect(screen.getByText('ExchangeModal')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите курс банка')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите курс обмена')).toBeInTheDocument();

        // Simulate input changes
        fireEvent.change(screen.getByPlaceholderText('Введите курс банка'), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByPlaceholderText('Введите курс обмена'), {
            target: { value: '200' },
        });

        // Check if input values are updated
        expect((screen.getByPlaceholderText('Введите курс банка') as HTMLInputElement).value).toBe('100');
        expect((screen.getByPlaceholderText('Введите курс обмена') as HTMLInputElement).value).toBe('200');
    });

    it('should show warning message when inputs are empty and button clicked', async () => {
        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Mock Ant Design's message warning
        vi.spyOn(message, 'warning');

        fireEvent.click(screen.getByText('Изменить курс'));

        await waitFor(() => {
            expect(message.warning).toHaveBeenCalledWith('Поле не может быть пустым.');
        });
    });

    it('should call addMutationExchange when button is clicked with valid inputs', async () => {
        const addMutationExchange = vi.fn().mockResolvedValue({});
        (useChangeSwap as Mock).mockReturnValue({
            mutate: addMutationExchange,
            status: { isPending: false },
        });

        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Set input values
        fireEvent.change(screen.getByPlaceholderText('Введите курс банка'), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByPlaceholderText('Введите курс обмена'), {
            target: { value: '200' },
        });

        // Click the button to submit the data
        fireEvent.click(screen.getByText('Изменить курс'));

        // Assert that the mutation function was called
        await waitFor(() => {
            expect(addMutationExchange).toHaveBeenCalledWith({
                currency: 'USD',
                exchangeRateOfBank: 100,
                exchangeRateOfObmen: 200,
            });
        });
    });

    it('should show loading state when submitting data', () => {
        const addMutationExchange = vi.fn().mockResolvedValue({});
        (useChangeSwap as Mock).mockReturnValue({
            mutate: addMutationExchange,
            status: { isPending: true },
        });

        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Check if the button shows loading
        expect(screen.getByText('Изменить курс')).toHaveAttribute('loading', 'true');
    });

    it('should display fetched exchange rates', () => {
        (useExchangeData as Mock).mockReturnValue({
            data: { pages: [{ buyRate: '100', saleRate: '200' }] },
            isLoading: false,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
        });

        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Check if exchange data is displayed
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('should show "Нет данных" when there is no exchange data', () => {
        (useExchangeData as Mock).mockReturnValue({
            data: { pages: [] },
            isLoading: false,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
        });

        render(<ExchangeModal setExchangeModal={setExchangeModal} />);

        // Check if "Нет данных" message is shown
        expect(screen.getByText('Нет данных')).toBeInTheDocument();
    });
});
