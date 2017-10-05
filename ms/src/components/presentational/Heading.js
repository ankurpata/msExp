import React, { Component } from 'react';

const Heading = ({h1Text, h2Text}) => {
    return (
            <div className="col-lg-12">
                <h1 className="heading-h1"> {h1Text}</h1>
                <h2 id="heading-count"> {h2Text} </h2>
            </div>
            );
};
export default Heading;

