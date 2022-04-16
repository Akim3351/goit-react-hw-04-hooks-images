import React from 'react';
import { LoaderWrapper } from './Loader.styled';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderWrapper>
      <TailSpin color="#3f51b5" height={80} width={80} />
    </LoaderWrapper>
  );
};

export default Loader;
