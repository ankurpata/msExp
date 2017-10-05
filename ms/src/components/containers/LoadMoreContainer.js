import React, { Component } from 'react';
import {loadMoreCars} from '../../actions/';
import { connect } from 'react-redux';

class LoadMoreContainer extends Component {

    onLoadMoreClick = (e) => {
        this.props.loadMoreCars();
    }
    render() {
        return (
                <div id="loadMore" onClick={this.onLoadMoreClick} className="btn btn-block btn-lg btn-primary" >
                    Load More
                </div>
                );
    }
}
const mapStateToProps = (state) => {
    return {
//        tagsValue: state.tagReducer.tagsValue,
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