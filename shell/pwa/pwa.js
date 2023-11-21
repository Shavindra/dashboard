if ("serviceWorker" in navigator) {
    console.log("Registering service worker");
    navigator.serviceWorker.register("/sw.js", { scope: "/" })
}




if ('Notification' in self && 'serviceWorker' in navigator) {
    console.log('Notification and service worker supported in this environment');
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        // You can now proceed to subscribe to push notifications
      } else if (permission === 'denied') {
        console.warn('Notification permission denied');
      } else {
        console.error('Notification permission dismissed');
      }
    }).catch(error => {
      console.error('Error requesting notification permission:', error);
    });
  } else {
    console.warn('Notifications or service workers not supported in this environment');
  }
  