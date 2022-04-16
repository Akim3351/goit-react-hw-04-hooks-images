import React, { useState } from 'react';
import { SearchbarHeader, SearchForm, Button, Input } from './Searchbar.styled';
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
    <SearchbarHeader>
      <SearchForm onSubmit={onFormSubmit}>
        <Button type="submit">
          <ImSearch />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onFormChange}
          value={searchQuery}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  sendForm: propTypes.func.isRequired,
};

export default Searchbar;
