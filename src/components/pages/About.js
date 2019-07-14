import React, {Fragment} from "react"

const About = (props) => {
    return (
        <Fragment>
            <h1>About This App</h1>
            <p>App to Search Github Users</p>
            <p>Version 1.0.0 </p>
        </Fragment>

    );
};

About.propTypes = {
    //name: PropTypes.string.isRequired
};

export default About;
