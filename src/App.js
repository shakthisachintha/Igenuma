import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';

import TeacherDashboard from './navigation/Teacher/DashboardNavigator';
import StudentDashboard from './navigation/Student/DashboardNavigator';
import AuthContext from './auth/context';
import { OfflineNotice } from './components';

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <>
      <OfflineNotice />
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? user.userType == "teacher" ? <TeacherDashboard /> : <StudentDashboard /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};


export default App;
