import React, {useState, useContext} from "react"

import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

const Search = () =>  {

    const githubContext = useContext(GithubContext);
    const {users, searchUsers, clearUsers } = githubContext;

    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const [text, setText] = useState("");


    const onChange = (e) => {
        setText(e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (text ==="") {
            setAlert("Please enter something", "light")
        }
        else {
            searchUsers(text);
            setText("");
        }
    };

    return (
        <div>
            <form className={"form"} action="" onSubmit={onSubmit}>
                <input
                    type="text"
                    name={"text"}
                    placeholder={"Search Users..."}
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value={"Search"} className={"btn btn-dark btn-block"}/>
            </form>
            {users.length>0 &&
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            }
        </div>
    );

};

export default Search;
