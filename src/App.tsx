/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
} from 'react-native';
import Navigator from './Navigations/StackNavigation';
import {
  QueryClientProvider,
  QueryClient
} from "@tanstack/react-query"
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ModalPortal } from "react-native-modals";


const queryClient = new QueryClient();

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Navigator />
        <ModalPortal />
      </Provider>
    </QueryClientProvider>
  );
}


export default App;
