import React, { Component } from 'react';
import Listing from '../presentational/Listing';
import { connect } from 'react-redux';

class ListingContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
                <div className="row" id="listing-container">
                    {this.props.carlist.map((item, index) =>
                                        <Listing key={index} item={item}/>
                                )}
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