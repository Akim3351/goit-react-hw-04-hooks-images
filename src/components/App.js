import React, { useEffect, useState, memo } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from '../services/API/fetch-images';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Notification from './Notification/Notification';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages(searchQuery, page)
      .then(res => {
        if (page === 1) {
          if (res.hits.length === 0) {
            toast.info('По Вашему запросу изображений не найдено');
            setStatus('resolved');
          } else {
            toast.success(`По Вашему запросу найдено ${res.total} избражений`);
            handleResult(result, res.hits);
            if (res.hits.length === res.total) {
              setStatus('endOfList');
            } else {
              setStatus('resolved');
            }
          }
        }

        if (page > 1) {
          handleResult(result, res.hits);
          setStatus('resolved');

          if (result.length === res.total) {
            toast.info('Достигнут конец списка');
            setStatus('endOfList');
          }
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchQuery, result, page]);

  const onSubmit = value => {
    if (value === searchQuery) {
      toast.info('Вы уже смотрите изображения по этому запросу');
      return;
    }
    setSearchQuery(value);
    setPage(1);
    setResult([]);
    setStatus('pending');
  };

  const onLoadMore = () => {
    setPage(page + 1);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onModalOpen = event => {
    setModalOpen(true);
    setLargeImg(event.target.dataset.large);
  };

  const onModalClose = () => {
    setModalOpen(false);
    setLargeImg('');
  };

  const handleResult = (prevArray, newArray) => {
    if (prevArray.length === 0) {
      setResult([...newArray]);
    } else {
      setResult([...prevArray, ...newArray]);
    }
  };

  return (
    <div className="App">
      <Searchbar sendForm={onSubmit} />

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (
        <>
          <ImageGallery onModalOpen={onModalOpen} hits={result} />
          <Button onLoadMore={onLoadMore} />
          {modalOpen && <Modal onClose={onModalClose} link={largeImg} />}
        </>
      )}

      {status === 'endOfList' && (
        <>
          <ImageGallery onModalOpen={onModalOpen} hits={result} />
          {modalOpen && <Modal onClose={onModalClose} link={largeImg} />}
        </>
      )}

      {status === 'rejected' && <Notification error={error} />}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default memo(App);
