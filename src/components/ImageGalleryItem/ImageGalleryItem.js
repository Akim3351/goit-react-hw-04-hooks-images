import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ hit, onModalOpen }) => {
  return (
    <GalleryItem>
      <GalleryImg
        onClick={onModalOpen}
        data-large={hit.largeImageURL}
        src={hit.previewURL}
        alt={hit.tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onModalOpen: propTypes.func.isRequired,
  hit: propTypes.shape({
    previewURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
