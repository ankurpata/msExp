import React, { Component } from 'react';
import Listing from '../presentational/Listing';
import { connect } from 'react-redux';

class ListingContainer extends Component {
    constructor() {
        super();
    }
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }
    getListings = () => {
        var listings;
        if (this.props.carlist) {
            if (this.props.carlist.length) {
                this.shuffle(this.props.carlist);

                listings = this.props.carlist.map((item, index) => {
                    return <Listing key={index} item={item}/>;
                });
            } else {
                listings = <div><p className="no-results-p1"> No Results Found</p><p className="no-results-p2">Need a reroute! Relax your preferences to see more cars.</p> </div>;
            }
        } else {
            listings = "";
        }
        return listings;
    }
    render() {
        return (
                <div className="row" id="listing-container">
                    {this.getListings()}
                </div>
                );
    }
}

const mapStateToProps = (state) => {
    return {
        carlist: state.listingReducer.carlist
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(ListingContainer);