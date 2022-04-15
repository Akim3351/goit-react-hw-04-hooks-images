import React, { useState } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

const Searchbar = ({ sendForm }) => {
  const [searchQuery, setsearchQuery] = useState('');

  const onFormChange = event => {
    setsearchQuery(event.currentTarget.value.toLowerCase());
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Введите запрос для поиска');
      return;
    }

    sendForm(searchQuery);
    setsearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onFormSubmit}>
        <button type="submit" className={css.button}>
          <ImSearch />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onFormChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  sendForm: propTypes.func.isRequired,
};

export default Searchbar;
