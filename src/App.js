import './App.css';

import React from 'react';
import Navbar from "./components/layout/Navbar"



import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

import GitHubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";


const App = () => {

    //const [users, setUsers] = useState([]);

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

    return (
        <GitHubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path={"/about"} component={About} />
                                <Route exact path={"/user/:login"} component={User} />
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitHubState>
    );
};

export default App;
