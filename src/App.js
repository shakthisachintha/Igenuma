import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';

import DashboardNavigator from './navigation/DashboardNavigator';
import AuthContext from './auth/context';
import { OfflineNotice } from './components';

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <>
      <OfflineNotice />
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? <DashboardNavigator /> : <AuthNavigator />}

        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};


export default App;
