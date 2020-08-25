import React from "react";
import { render, screen, wait, waitFor } from "@testing-library/react";
import CharacterResult from "./CharacterResult";
import ICharacter from "../../models/character";

const character: ICharacter = {
    name: "name",
    hairColor: "hairColor",
    height: "height",
    gender: "gender",
    birthYear: "birthYear",
    mass: "mass",
};

describe("CharacterResult", () => {
    it("Displays the character details", async () => {
        render(<CharacterResult submitted={false} character={character} />);

        await waitFor(() => expect(screen.getByText(character.name)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(character.hairColor)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(character.gender)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(character.birthYear)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(character.mass)).toBeInTheDocument());

        await waitFor(() => expect(screen.getByText(character.height)).toBeInTheDocument());
        ;
    });

    describe('When character is undiefined and submitted is true', () => {
        it('Displays a not found message', () => {
            render(<CharacterResult submitted={true} character={undefined} />);
            expect(screen.getByText('No character found')).toBeInTheDocument();;
        });
    });
});
