/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import { Person } from '../../types/Person';
import classNames from 'classnames';
import { DropDownItem } from '../DropDownItem';
import { ErrorBlock } from '../ErrorBlock';

interface Props {
  allPeople: Person[];
  onPersonChange: (index: number) => void;
}

export const DropDownMenu = ({ allPeople, onPersonChange }: Props) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const filteredPeople = appliedQuery
    ? [...allPeople].filter(person =>
        person.name.toLowerCase().includes(appliedQuery.toLowerCase()),
      )
    : [];
  const isDropdownActive = !!filteredPeople.length;
  const errorMessage =
    appliedQuery && !isDropdownActive ? 'No matching suggestions' : '';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setQuery(newValue);
    setAppliedQuery(newValue);
  };

  return (
    <>
      <div
        className={classNames('dropdown', { 'is-active': isDropdownActive })}
      >
        <div className="dropdown-trigger">
          <input
            type="text"
            value={query}
            placeholder="Enter a part of the name"
            className="input"
            onChange={handleInputChange}
            data-cy="search-input"
          />
        </div>

        <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
          <div className="dropdown-content">
            {isDropdownActive &&
              filteredPeople.map(person => (
                <DropDownItem
                  person={person}
                  allPeople={allPeople}
                  onClick={onPersonChange}
                  key={person.slug}
                />
              ))}
          </div>
        </div>
      </div>
      <ErrorBlock errorMessage={errorMessage} />
    </>
  );
};
