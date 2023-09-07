import React from 'react';
import ModalImage from 'react-modal-image';
import PropTypes from 'prop-types';

import Loader from 'components/Loader/Loader';
import prewImg from '../../no_img.jpg';
import { Alert } from '@mui/material';

export const ImageGalleryItem = ({ state }) => {
  const { data, status } = state;
  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <Alert severity="error">Error! Reload page</Alert>;
  }

  if (status === 'resolved') {
    if (data.hits.length === 0) {
      return <Alert severity="error">There is no images!</Alert>;
    }
    return data.hits.map(
      ({ webformatURL = prewImg, id, tags, largeImageURL }) => {
        return (
          <li className="gallery-item" key={id}>
            <ModalImage
              small={webformatURL}
              large={largeImageURL}
              hideDownload="true"
              hideZoom="true"
              imageBackgroundColor="transperend"
              alt={tags}
            />
          </li>
        );
      }
    );
  }
};

ImageGalleryItem.propTypes = {
  state: PropTypes.object,
};

export default ImageGalleryItem;
