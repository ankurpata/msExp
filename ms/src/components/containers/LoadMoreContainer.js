import React, { Component } from 'react';
import {loadMoreCars} from '../../actions/';
import { connect } from 'react-redux';

class LoadMoreContainer extends Component {

    onLoadMoreClick = (e) => {
        this.props.loadMoreCars();
    }
    
    render() {
        return (
                <div id="loadMore" onClick={this.onLoadMoreClick} className={ (this.props.carlist && this.props.carlist.length) ? 'btn btn-block btn-lg btn-primary' : 'hideMe' } >
                    Load More
                </div>
                );
    }
}
const mapStateToProps = (state) => {
    return {
//        tagsValue: state.tagReducer.tagsValue,
        carlist: state.listingReducer.carlist
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadMoreCars: () => {
            dispatch(loadMoreCars());
        }
    }
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(LoadMoreContainer);