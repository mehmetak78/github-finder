import './App.css';

import React, {Component, Fragment} from 'react';
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";


class App extends Component {

    state = {
        users: [],
        user: {},
        repos:[],
        loading: false,
        alert:null
    };

    async componentDidMount() {


        this.setState({loading: true});

        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users:res.data,loading:false});

    }

    searchUsers = async (userName) =>  {
        this.setState({loading: true});


        const res = await axios.get(`https://api.github.com/search/users?q=${userName}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({users:res.data.items,loading:false});


    };

    getUser = async (userName) => {
        this.setState({loading: true});

        const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({user:res.data,loading:false});
    };

    getUserRepos = async (userName) => {
        this.setState({loading: true});

        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({repos:res.data,loading:false});
    };

    clearUsers =  () =>  {
        this.setState({users:[],loading:false});
    };

    setAlert = (message, type) => {
        this.setState({alert: {message,type}});
        setTimeout(() => this.setState({alert: null}),5000);
    };

    render() {
        const {users, loading, user, repos} = this.state;
        return (

            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route exact path="/" render={props => (
                                <Fragment>
                                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                                            showClear={users.length > 0}
                                            setAlert={this.setAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                                )}>
                            </Route>
                            <Route exact path={"/about"} component={About} />
                            <Route exact path={"/user/:login"} render={props => (
                                <User {...props} getUser={this.getUser} user={user} loading={loading}
                                getUserRepos={this.getUserRepos} repos={repos}/>
                            )} />

                        </Switch>

                    </div>

                </div>
            </Router>
        );
    }
}

export default App;
