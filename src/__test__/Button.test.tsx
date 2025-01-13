import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../components/Button';

describe('Button component', () => {
    it('renders correctly and handles click', () => {
        const handleClick = vi.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});