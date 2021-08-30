import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import request from "../../public/request";

const ChooseCityComponent = (props) => {
    const { className, vm } = props;
    const [uuid, setUuid] = useState(Math.random());

    useEffect(() => {
    }, []);

    return (
        <>
            
        </>
    );
};

ChooseCityComponent.propTypes = {
    className: PropTypes.string,
};

export default ChooseCityComponent;
