import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { User } from './interfaces/user.model'

import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import NewOutcome from './components/NewOutcome/NewOutcome';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleAuth = (user: User) => {
    if(user) {
      setUser(user);
    } else {
      setUser(null);
      localStorage.removeItem('jwtToken')
    };
  };

  const logoutHandler = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <>
          <Header user={null} logoutHandler={logoutHandler} />
          <Landing handleAuth={handleAuth}/>
      </>
    );
  } else {
    return(
       <>
          <Header user={user} logoutHandler={logoutHandler} />
      </>
    )
  }

}

export default App;
