import React from 'react'

import './characterResult.scss'
import ICharacter from '../../models/character'


interface IProps {
  character: ICharacter | undefined,
  submitted: Boolean
}

const CharacterResult: React.FC<IProps> = ({ character, submitted }) => {
  return (
    <div className="characterResult">
      {character ?
        <table className="table">
          <thead className="table__header">
            <tr>
              <th>{character.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gender</td>
              <td>{character.gender}</td>
            </tr>
            <tr>
              <td>Birth year</td>
              <td>{character.birthYear}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{character.height}</td>
            </tr>
            <tr>
              <td>Mass</td>
              <td>{character.mass}</td>
            </tr>
            <tr>
              <td>Hair color</td>
              <td>{character.hairColor}</td>
            </tr>
          </tbody>
        </table>
        :
        submitted && <div>No character found</div>
      }
    </div>
  )
}

export default CharacterResult
