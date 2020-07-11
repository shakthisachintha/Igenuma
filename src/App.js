import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';


import DashboardNavigator from './navigation/DashboardNavigator';
import AuthContext from './auth/context';





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
