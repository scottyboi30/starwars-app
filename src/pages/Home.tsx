import React, { useState, useReducer } from 'react'

import Search from '../components/search/Search';
import CharacterResult from '../components/character-result/CharacterResult'
import ICharacter from '../models/character';
import { snakeToCamel } from '../lib/jsonHelpers';
import Loader from '../components/loader/Loader';

type state = {
  error: string | null,
  character: ICharacter | null
}

const initialState = {
  error: null,
  character: null,
}

const characterReducer = (state: state, action: any) => {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        character: action.character,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        character: null,
      }
    }
    default: {
      return state
    }
  }
}

const Home: React.FC = () => {
  const [{ error, character }, dispatch] = useReducer(
    characterReducer,
    initialState
  );
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [submitted, setSubmitted] = useState<Boolean>(false);

  const submit = async (): Promise<void> => {
    setLoading(true);
    setSubmitted(true);

    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${term}`);
      const data = await response.json();
      const characterMatch = data.results.find((c: ICharacter) => c.name.toLowerCase() === term.toLowerCase());

      if (!!characterMatch) {
        const character: ICharacter = snakeToCamel(characterMatch);
        dispatch({ type: 'SUCCESS', character });
      } else {
        dispatch({ type: 'SUCCESS', character: null });
      }
    } catch {
      dispatch({ type: 'ERROR', error: 'An error occurred, please try again' });
    }
    setLoading(false);
  }

  const renderResult = (): React.ReactNode => {
    if (error) {
      return (<div>{error}</div>)
    } else {
      return (
        loading ? <Loader />
          :
          <CharacterResult character={character} submitted={submitted} />
      )
    }
  }

  return (
    <>
      <Search setTerm={setTerm} term={term} submit={submit} label={"Character name"} />
      {renderResult()}
    </>
  )
}

export default Home
