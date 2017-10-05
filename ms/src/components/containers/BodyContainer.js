import React, { Component } from 'react';
import Heading from '../presentational/Heading';
import BackToTop from '../presentational/BackToTop';
import HeadingContainer from './HeadingContainer';
import ListingContainer from './ListingContainer';
import LoadMoreContainer from './LoadMoreContainer';
import HorizontalRuler from '../presentational/HorizontalRuler';


class BodyContainer extends Component {
    render() {
        return (
                <div className="container">
                    <HeadingContainer />
                    <HorizontalRuler />
                    <ListingContainer />
                    <LoadMoreContainer />
                    <BackToTop isVisibleBackToTop= {true} />
                    <HorizontalRuler />
                </div>
                );
    }
}

export default BodyContainer;