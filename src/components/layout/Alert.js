import React from "react"

const Alert = ({alert}) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> {alert.message}</i>
            </div>
        )
    );
};

Alert.propTypes = {
    //name: PropTypes.string.isRequired
};

export default Alert;
