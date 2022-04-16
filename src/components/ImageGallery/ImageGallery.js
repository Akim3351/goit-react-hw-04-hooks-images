import React from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

const ImageGallery = ({ onModalOpen, hits }) => {
  return (
    <Gallery>
      {hits.map(hit => {
        return (
          <ImageGalleryItem hit={hit} key={hit.id} onModalOpen={onModalOpen} />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  hits: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      previewURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
