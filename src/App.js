import './App.css';

import React, {useState, Fragment} from 'react';
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users";

import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

import GitHubState from "./context/github/GithubState";


const App = () => {

    //const [users, setUsers] = useState([]);

    const [alert, setAlert] = useState(null);

    /*
    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            const res =  await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
            setUsers(res.data);
            setLoading(false);
        };
        fetchData();
        //eslint-disable-next-line
    }, []);
    */

    const setAlertMessage = (message, type) => {
        setAlert({message,type});
        setTimeout(() => setAlert(null),5000);
    };

    return (
        <GitHubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path="/" render={props => (
                                <Fragment>
                                    <Search setAlert={setAlertMessage}/>
                                    <Users/>
                                </Fragment>
                                )}>
                            </Route>
                            <Route exact path={"/about"} component={About} />
                            <Route exact path={"/user/:login"} component={User} />
                            )} />

                        </Switch>

                    </div>

                </div>
            </Router>
        </GitHubState>
    );
};

export default App;
