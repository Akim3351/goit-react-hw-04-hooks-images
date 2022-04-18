import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ hit, onModalOpen }) => {
  const { largeImageURL, previewURL, tags } = hit;
  return (
    <GalleryItem>
      <GalleryImg
        onClick={onModalOpen}
        data-large={largeImageURL}
        src={previewURL}
        alt={tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onModalOpen: propTypes.func.isRequired,
  hit: propTypes.shape({
    largeImageURL: propTypes.string.isRequired,
    previewURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
