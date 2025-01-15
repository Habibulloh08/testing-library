import { render, screen, fireEvent } from '@testing-library/react';
import ExchangeModal from '../components/ExchangeModal';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useChangeSwap, useExchangeData } from '../api/Exchange';

// Mock the necessary hooks
vi.mock('../api/Exchange', () => ({
    useChangeSwap: vi.fn(),
    useExchangeData: vi.fn(),
}));

describe('ExchangeModal', () => {
    const setExchangeModal = vi.fn();
    const addMutationExchange = vi.fn();

    // Set up mock return values for the hooks before each test
    beforeEach(() => {
        (useChangeSwap as any).mockReturnValue({
            mutate: addMutationExchange,
            status: {
                isPending: false,
                isSuccess: false,
                isError: false,
                isIdle: true,
            },
        });

        (useExchangeData as any).mockReturnValue({
            data: { pages: [] },
            fetchNextPage: vi.fn(),
            hasNextPage: false,
            isLoading: false,
        });
    });

    it('renders correctly', () => {
        render(<ExchangeModal setExchangeModal={setExchangeModal} />);
        expect(screen.getByText('ExchangeModal')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите курс банка')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите курс обмена')).toBeInTheDocument();
        expect(screen.getByText('Изменить курс')).toBeInTheDocument();
    });

    it('shows warning message if inputs are empty', async () => {
        render(<ExchangeModal setExchangeModal={setExchangeModal} />);
        const buttonElement = screen.getByRole('button', {
            name: /изменить курс/i
        });
        fireEvent.click(buttonElement);
        const warningMessage = await screen.findByText(/поле не может быть пустым\./i);
        expect(warningMessage).toBeInTheDocument();
    });


    it('calls addMutationExchange with correct data', () => {
        render(<ExchangeModal setExchangeModal={setExchangeModal} />);
        fireEvent.change(screen.getByPlaceholderText('Введите курс банка'), { target: { value: '100' } });
        fireEvent.change(screen.getByPlaceholderText('Введите курс обмена'), { target: { value: '200' } });
        fireEvent.click(screen.getByText('Изменить курс'));

        expect(addMutationExchange).toHaveBeenCalledWith(
            {
                currency: 'USD',
                exchangeRateOfBank: 100,
                exchangeRateOfObmen: 200,
            },
            expect.any(Object)
        );
    });
});
