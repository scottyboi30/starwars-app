import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from './Search';

describe('Search', () => {
    it('Updates input on change', () => {
        const submit = jest.fn();
        const setTerm = jest.fn();
        render(<Search term={""} submit={submit} setTerm={setTerm} label={"Test"}/>);

        const input = screen.getByTestId("search-input");

        fireEvent.change(input, { target: { value: "test" } });
      
        expect(setTerm).toHaveBeenCalledWith("test");
    });

    it('Calls submit when the search button is clicked', () => {
        const submit = jest.fn();
        const setTerm = jest.fn();
        render(<Search term={""} submit={submit} setTerm={setTerm} label={"Test"}/>);

        fireEvent.click(screen.getByTestId("search-button"));
      
        expect(submit).toHaveBeenCalled();
    });

    it('Calls submit when enter is pressed in the input', () => {
        const submit = jest.fn();
        const setTerm = jest.fn();
        render(<Search term={""} submit={submit} setTerm={setTerm} label={"Test"}/>);

        const input = screen.getByTestId("search-input");
        fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
      
        expect(submit).toHaveBeenCalled();
    });
    

    it('Displays the label', () => {
        const submit = jest.fn();
        const setTerm = jest.fn();
        render(<Search term={""} submit={submit} setTerm={setTerm} label={"Test"}/>);

        const label = screen.getByText('Test');
      
        expect(label).toBeInTheDocument();
    });
});
