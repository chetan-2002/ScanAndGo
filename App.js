/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import MyStack from './Navigators/stackNavigator';
import {NavigationContainer} from '@react-navigation/native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <>
          <MyStack></MyStack>
        </>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
