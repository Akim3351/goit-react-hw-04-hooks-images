import React from 'react';
import { ButtonWrapper, Btn } from './Button.styled';
import propTypes from 'prop-types';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonWrapper>
      <Btn type="button" onClick={onLoadMore}>
        Load more
      </Btn>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onLoadMore: propTypes.func.isRequired,
};

export default Button;
