import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';


import DashboardNavigator from './navigation/DashboardNavigator';
import AuthContext from './auth/context';

// import { DefaultTheme,  } from '@react-navigation/native';


const App = () => {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <DashboardNavigator /> : <AuthNavigator />}

      </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;
