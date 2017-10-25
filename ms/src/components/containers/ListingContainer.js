import React, { Component } from 'react';
import Listing from '../presentational/Listing';
import { connect } from 'react-redux';

class ListingContainer extends Component {
    constructor() {
        super();
    }

    getListings = () => {
        var listings;
        if (this.props.carlist) {
            if (this.props.carlist.length) {
                listings = this.props.carlist.map((item, index) => {
                    return <Listing key={index} item={item}/>;
                });
            } else {
                listings = <div><p className="no-results-p1"> No Results Found</p><p className="no-results-p2">Need a reroute! Relax your preferences to see more cars.</p> </div>;
            }
        }else{
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