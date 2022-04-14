import React, { Component } from 'react';
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

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    status: 'idle',
    error: null,
    result: [],
    modalOpen: false,
    largeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPageNum = prevState.page;
    const nextPageNum = this.state.page;
    const prevImages = prevState.result;

    if (prevQuery !== nextQuery || prevPageNum !== nextPageNum) {
      fetchImages(nextQuery, nextPageNum)
        .then(res => {
          if (nextPageNum === 1) {
            if (res.hits.length === 0) {
              toast.info('По Вашему запросу изображений не найдено');
              this.setState({ result: [], status: 'idle' });
            } else {
              toast.success(
                `По Вашему запросу найдено ${res.total} избражений`
              );
              this.setState({ result: res.hits, status: 'resolved' });
              if (this.state.result.length === res.total) {
                this.setState({ status: 'endOfList' });
              }
            }
          }

          if (nextPageNum > 1) {
            this.setState(() => ({
              result: [...prevImages, ...res.hits],
              status: 'resolved',
            }));
            if (this.state.result.length === res.total) {
              toast.info('Достигнут конец списка');
              this.setState({ status: 'endOfList' });
            }
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  onSubmit = value => {
    if (value === this.state.searchQuery) {
      toast.info('Вы уже смотрите изображения по этому запросу');
      return;
    }
    this.setState({ searchQuery: value, page: 1, status: 'pending' });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onModalOpen = event => {
    this.setState({
      modalOpen: true,
      largeImg: event.target.dataset.large,
    });
  };

  onModalClose = () => {
    this.setState({
      modalOpen: false,
      largeImg: '',
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {this.state.status === 'pending' && <Loader />}

        {this.state.status === 'resolved' && (
          <>
            <ImageGallery
              onModalOpen={this.onModalOpen}
              hits={this.state.result}
            />
            <Button onLoadMore={this.onLoadMore} />
            {this.state.modalOpen && (
              <Modal onClose={this.onModalClose} link={this.state.largeImg} />
            )}
          </>
        )}

        {this.state.status === 'endOfList' && (
          <>
            <ImageGallery
              onModalOpen={this.onModalOpen}
              hits={this.state.result}
            />
            {this.state.modalOpen && (
              <Modal onClose={this.onModalClose} link={this.state.largeImg} />
            )}
          </>
        )}

        {this.state.status === 'rejected' && (
          <Notification error={this.state.error} />
        )}

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
