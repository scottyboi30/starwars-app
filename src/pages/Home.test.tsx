import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Home from './Home';
import ICharacter from '../models/character';

const character: ICharacter = {
    name: "name",
    hairColor: "hairColor",
    height: "height",
    gender: "gender",
    birthYear: "birthYear",
    mass: "mass",
};

describe('Home', () => {
    const server = setupServer(
        rest.get('https://swapi.dev/*', (req, res, ctx) => {
          return res(ctx.json({ results: [character] }))
        })
      );
      
      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())

    describe('When a character matches', () => {
        beforeAll(() => {
            render(<Home />);
    
            fireEvent.change(screen.getByTestId("search-input"), { target: { value: character.name } });
            fireEvent.click(screen.getByTestId("search-button"));
        });

        it('Displays the character after loading', async () => {
            await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
            await waitFor(() => expect(screen.getByText(character.name)).toBeInTheDocument());  
        });
    });

    describe('When a character does not match', () => {
        beforeAll(() => {
            render(<Home />);

            fireEvent.change(screen.getByTestId("search-input"), { target: { value: "t" } });
            fireEvent.click(screen.getByTestId("search-button"));
        });

        it('Does not display the character after loading', async () => {
            await waitFor(() => expect(screen.getByTestId("loader")).toBeInTheDocument());
            await waitFor(() => expect(screen.getByText('No character found')).toBeInTheDocument());  
        });
    });

    describe('When a error occurs getting a character', () => {
        beforeAll(() => {
            server.use(
                rest.get('https://swapi.dev/*', (req, res, ctx) => {
                  return res(ctx.status(500))
                })
              );
            render(<Home />);
            fireEvent.click(screen.getByTestId("search-button"));
        });

        it('Displays an error message', async () => {
            await waitFor(() => expect(screen.getByText('An error occurred, please try again')).toBeInTheDocument());  
        });
    });
});
