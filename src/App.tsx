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


const queryClient = new QueryClient();

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  );
}


export default App;
