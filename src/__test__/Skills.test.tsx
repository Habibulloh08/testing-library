import { logRoles, render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Skills } from "../components/Skills";

describe("Skills Component", () => {
    const skills = ["React", "Vue", "Angular"];

    it("renders correctly", () => {
        render(<Skills skills={skills} />);
        const listElement = screen.getByRole('list');
        expect(listElement).toBeInTheDocument();
    });

    it("renders a list correctly", () => {
        render(<Skills skills={skills} />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(skills.length);
    });

    it("renders Login button", () => {
        render(<Skills skills={skills} />);
        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        expect(loginButton).toBeInTheDocument();
    });
    it("does not render Start learning button", () => {
        render(<Skills skills={skills} />);
        const startLearningButton = screen.queryByRole('button', {
            name: 'Start learning'
        });
        expect(startLearningButton).not.toBeInTheDocument();
    });
    it('Start learning button is eventually displayed', async () => {
        const view = render(<Skills skills={skills} />);
        logRoles(view.container)
        // screen.debug
        const startLearningButton = await screen.findByRole('button', {
            name: 'Start learning'
        }, {
            timeout: 5000
        });
        // screen.debug
        expect(startLearningButton).toBeInTheDocument();
    })
});