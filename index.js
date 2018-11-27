import React from "react";
import {AppRegistry} from 'react-native';
import { Provider } from 'mobx-react/native';
import App from './src/components/App';
import {name as appName} from './app.json';
import venueStore from './src/store/VenueStore';

const Root = () => (
  <Provider venueStore={venueStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
