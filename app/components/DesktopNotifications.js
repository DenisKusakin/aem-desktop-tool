import React from 'react';
import Notification  from 'react-web-notification';

const title = 'React-Web-Notification';
const body = 'Hello';
const tag = 'Tag';
const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
// const icon = 'http://localhost:3000/Notifications_button_24.png';

// Available options
// See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
const options = {
  tag: tag,
  body: body,
  icon: icon,
  lang: 'en',
  dir: 'ltr'
};

const DesktopNotification = () => <div><Notification
  ignore={false}
  timeout={1000*30}
  title={title}
  options={options}
/>
  <Notification
    ignore={false}
    timeout={1000*30}
    title={title}
    options={options}
  />
</div>;

export default DesktopNotification;
