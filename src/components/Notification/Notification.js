import React from 'react';
import { NotificationWrapper, NotificationText } from './Notification.styled';

const Notification = ({ error }) => {
  const notificationText = `Opps!! Произошла ошибка при выполнении запроса, а именно: "${error}". Попробуйте еще раз или обратитесь к администратору за помощью.`;
  return (
    <NotificationWrapper>
      <NotificationText>{notificationText}</NotificationText>
    </NotificationWrapper>
  );
};

export default Notification;
