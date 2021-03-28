import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from "react";
import { Grommet } from 'grommet';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Pets from './components/Pets';
import Home from './components/Home';
import Shops from './components/Shops';
import Vets from './components/Vets';
import Profile from './components/Profile';
import ShowPost from './components/PetPost/ShowPost';
import NewPost from './components/PetPost/NewPost';
import EditPost from './components/PetPost/EditPost';
import Play from './components/Play';
import NotFound from './components/NotFound';
import EditProfile from './components/EditProfile';
import Inbox from './components/Inbox';
import Credits from './components/Credits';
import Forgot from './components/Forgot';
import Reset from './components/Reset';

import jwt_decode from "jwt-decode";

const theme = {
  button: {
    border: {
      radius: "10px",
    },
    primary: {
      extend: {"fontFamily": 'Potta One'}
    }
  },
  global: {
    colors: {
      selected: "#76c6ff"
    }
  },
  image: {
    extend: {"border-radius" : "5px"}
  }
}


function App() {

  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });
  const [dataLoading, setDataLoading] = useState(false)
  const userLogin = () => {

    if (localStorage.jwtToken) {

      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken).user;

      if (!localStorage[currentUser._id]) localStorage.setItem("userId", JSON.stringify(currentUser._id))
      setAuth({ currentUser, isLoggedIn: true });
    } else {

      setAuth({ currentUser: null, isLoggedIn: false });

    }
    setDataLoading(true)
  };

  useEffect(userLogin, []);

  return (

    <>{dataLoading && <Grommet theme={theme} full>

      <Router>

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login loginCallback={userLogin} />
          </Route>

          <Route exact path="/reset">
            <Reset />
          </Route>

          <Route exact path="/pets">
            <Pets />
          </Route>

          <Route path="/shops">
            <Shops />
          </Route>

          <Route path="/vets">
            <Vets />
          </Route>

          <Route exact path="/profile">
            <Profile auth={auth} />
          </Route>

          <Route path="/profile/edit">
            <EditProfile auth={auth} loginCallback={userLogin} />
          </Route>

          <Route path="/pets/post/:id">
            <ShowPost />
          </Route>

          <Route path="/pets/new">
            <NewPost />
          </Route>

          <Route path="/play">
            <Play />
          </Route>

          <Route path="/pets/edit/:id">
            <EditPost />
          </Route>

          <Route path="/inbox">
            <Inbox />
          </Route>

          <Route path="/credits">
            <Credits />
          </Route>

          <Route path="/reset/:token">
            <Reset />
          </Route>

          <Route path="/forgotpassword">
            <Forgot />
          </Route>

          <Route path="/*">
            <NotFound />
          </Route>

        </Switch>

        <NavBar auth={auth} loginCallback={userLogin} />
        <Footer />


      </Router>
    </Grommet>}
    </>

  );
}

export default App;
