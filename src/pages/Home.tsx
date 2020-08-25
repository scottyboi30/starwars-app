import React, { useState } from 'react'

import Search from '../components/search/Search';
import CharacterResult from '../components/character-result/CharacterResult'
import ICharacter from '../models/character';
import { snakeToCamel } from '../lib/jsonHelpers';
import Loader from '../components/loader/Loader';

const Home: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [character, setCharacter] = useState<ICharacter|undefined>(undefined);
  const [submitted, setSubmitted] = useState<Boolean>(false);

  const submit = async (): Promise<void> => {
    setLoading(true);
    setSubmitted(true);

    const response = await fetch(`https://swapi.dev/api/people/?search=${term}`);
    const data = await response.json();

    const characterMatch = data.results.find((c: ICharacter) => c.name.toLowerCase() === term.toLowerCase());
    if(!!characterMatch) {
      const character: ICharacter = snakeToCamel(characterMatch);
      setCharacter(character);
    }else {
      setCharacter(undefined);
    }
    setLoading(false);
  }

  return (
    <>
      <Search setTerm={setTerm} term={term} submit={submit} label={"Character name"} />
      {loading ? <Loader />
        :
        <CharacterResult character={character} submitted={submitted} />
      }
    </>
  )
}

export default Home
