import React from 'react'
import './search.scss'

interface IProps {
  term: string,
  label: string,
  setTerm: (value: string) => void,
  submit: () => void;
};

const Search: React.FC<IProps> = ({ submit, term, setTerm, label }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      submit();
    }
  }

  return (
    <div className="search">
      <div className="search__label">{label}</div>
      <div className="search__inline">
        <input
          data-testid="search-input"
          onKeyPress={handleKeyPress}
          className="search__inline__input"
          value={term} type="text"
          onChange={e => setTerm(e.target.value)}
          placeholder="Character name">
        </input>
        {/* eslint-disable-next-line */}
        <a data-testid="search-button" onClick={submit} className="btn">Search</a>
      </div>
    </div>
  );
}

export default Search
