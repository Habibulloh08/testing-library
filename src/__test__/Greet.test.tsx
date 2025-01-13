import { render, screen } from "@testing-library/react";
import { describe, it, expect, } from "vitest";
import Greet from "../components/Greet";

describe("Greet Component", () => {
    // it("renders the main heading", () => {
    //     render(<Greet />);
    //     const heading = screen.getByText(/Use/i);
    //     expect(heading).toBeInTheDocument();
    // });
    it('render with props', () => {
        render(<Greet name="John" />);
        const heading = screen.getByText(/John/i);
        expect(heading).toBeInTheDocument();
    });
});

