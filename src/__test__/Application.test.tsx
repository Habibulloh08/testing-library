import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Application } from "../components/Application";

describe("Application Component", () => {
    it("renders correctly", () => {
        render(<Application />);
        const pageHeading = screen.getByRole('heading', {
            level: 1,
        })
        expect(pageHeading).toBeInTheDocument()
        const sectionHeading = screen.getByRole('heading', {
            level: 2,
        })
        expect(sectionHeading).toBeInTheDocument()

        const paragraphElement = screen.getByText(/All fields are mandatory/i)
        expect(paragraphElement).toBeInTheDocument()
        const closeElement = screen.getByTitle(/close/i)
        expect(closeElement).toBeInTheDocument()
        const imageElement = screen.getByAltText(/a person with a laptop/i)
        expect(imageElement).toBeInTheDocument()

        const customElement = screen.getByTestId('custom-element')
        expect(customElement).toBeInTheDocument()

        const nameElement = screen.getByRole('textbox', {
            name: /name/i
        })
        expect(nameElement).toBeInTheDocument();
        const nameElement2 = screen.getByLabelText(/name/i, {
            selector: 'input'
        })
        expect(nameElement2).toBeInTheDocument()
        const nameElement3 = screen.getByPlaceholderText(/fullname/i)
        expect(nameElement3).toBeInTheDocument()
        const nameElement4 = screen.getByDisplayValue(/value/i)
        expect(nameElement4).toBeInTheDocument()

        const bioElement = screen.getByRole('textbox', {
            name: /bio/i
        })

        expect(bioElement).toBeInTheDocument()

        const jobLocationElement = screen.getByRole('combobox')
        expect(jobLocationElement).toBeInTheDocument()
        const termsEleement = screen.getByRole('checkbox')
        expect(termsEleement).toBeInTheDocument()
        const termsEleement2 = screen.getByLabelText(/I agree to the terms and conditions/i)
        expect(termsEleement2).toBeInTheDocument()
        const submitButtonElement = screen.getByRole('button')
        expect(submitButtonElement).toBeInTheDocument()


    });
});