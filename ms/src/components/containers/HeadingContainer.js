import React, { Component } from 'react';
import Heading from '../presentational/Heading';
import { connect } from 'react-redux';

import {Helmet} from "react-helmet";


class HeadingContainer extends Component {
    render() {
        return (<div className="row">
            <Heading h1Text = {this.props.h1Text} h2Text = {this.props.h2Text} />
            {this.props.metaTags ? 
            <Helmet>
                <meta charSet="utf-8" />
                <title>{this.props.metaTags.title}</title>
                <link rel="canonical" href={this.props.metaTags.canonical}  />
                <meta name="description" content={this.props.metaTags.description} />
                <meta name="keywords" content={this.props.metaTags.keywords}  />
                <meta property="og:title" content={this.props.metaTags.title} />
                <meta property="og:image" content="http://www.motorsingh.com/assets/images/fbMotor.jpg"/>
                <meta property="og:url" content={this.props.metaTags.canonical} />
                <meta property="og:site_name" content="Motorsingh.com"/>
                <meta property="og:description" content={this.props.metaTags.description} /> 
                <meta property="fb:app_id" content="983655238431992" />
            </Helmet>
            : ""}
        </div>
                );
    }
}

const mapStateToProps = (state) => {
    return {
        h1Text: state.headingReducer.heading.h1Text,
        h2Text: state.headingReducer.heading.h2Text,
        metaTags: state.headingReducer.heading.metaTags
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(HeadingContainer);