/* eslint-disable @typescript-eslint/indent */
import { useCallback, useMemo, useState } from 'react';
import { Person } from '../../types/Person';
import classNames from 'classnames';
import { DropDownItem } from '../DropDownItem';
import { ErrorBlock } from '../ErrorBlock';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
function debounce(callback: Function, delay: number) {
  let timerId = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

interface Props {
  allPeople: Person[];
  onPersonChange: (index: number) => void;
}

export const DropDownMenu = ({ allPeople, onPersonChange }: Props) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const filteredPeople = useMemo(() => {
    return appliedQuery
      ? [...allPeople].filter(person =>
          person.name.toLowerCase().includes(appliedQuery.toLowerCase()),
        )
      : [];
  }, [allPeople, appliedQuery]);
  const isDropdownActive = !!filteredPeople.length;
  const errorMessage =
    appliedQuery && !isDropdownActive ? 'No matching suggestions' : '';
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);
  const resetQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuery('');
    setAppliedQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setQuery(newValue);
    applyQuery(newValue);
  };

  return (
    <>
      <div
        className={classNames('dropdown', { 'is-active': isDropdownActive })}
      >
        <div className="field has-addons">
          <input
            type="text"
            value={query}
            placeholder="Enter a part of the name"
            className="input search-input"
            onChange={handleInputChange}
            id="search-input"
            data-cy="search-input"
          />
          <button
            type="button"
            id="clear-search-button"
            className="icon-button"
            onClick={resetQuery}
            aria-label="Clear search"
          >
            <i className="fas fa-times"></i>
          </button>
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
