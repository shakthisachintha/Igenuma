import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import Screen from './components/Screen';
// import { DefaultTheme,  } from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
};


export default App;
