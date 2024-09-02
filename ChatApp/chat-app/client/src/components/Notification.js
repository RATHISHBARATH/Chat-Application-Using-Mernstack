import React, { useEffect } from 'react';

const Notification = ({ message }) => {
  useEffect(() => {
    if (message) {
      if (Notification.permission === 'granted') {
        new Notification('New Message', { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('New Message', { body: message });
          }
        });
      }
    }
  }, [message]);

  return null;
};

export default Notification;
