import React, {useReducer} from "react";
import axios from "axios";
import GitHubContext from "./GithubContext";
import GitHubReducer from "./GithubReducer";
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from "../types";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const searchUsers = async (userName) =>  {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${userName}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type:SEARCH_USERS,
            payload: res.data.items
        })
    };

    const setLoading = () => dispatch({type: SET_LOADING});

    const clearUsers =  () =>  dispatch({type: CLEAR_USERS});

    const getUser = async (userName) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type:GET_USER,
            payload: res.data
        })
    };

    const getUserRepos = async (userName) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({
            type:GET_REPOS,
            payload: res.data
        })
    };

    return <GitHubContext.Provider
            value={
                {
                    users: state.users,
                    user: state.user,
                    repos: state.repos,
                    loading: state.loading,
                    searchUsers,
                    clearUsers,
                    getUser,
                    getUserRepos
                }
            }
        >
        {props.children}
        </GitHubContext.Provider>
};

export default GithubState;

