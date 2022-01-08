import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { User } from './interfaces/user.model'

import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';

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

  return (
    <Router>
      <div className="App">
        <Header user={user} logoutHandler={logoutHandler} />
        <Landing handleAuth={handleAuth}/>
      </div>
    </Router>
  );
}

export default App;
