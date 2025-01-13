import { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
    return <button onClick={onClick}>{children}</button>;
}