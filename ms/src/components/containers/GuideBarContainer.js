import React, { Component } from 'react';
import GuideBar from '../presentational/GuideBar';
import {addGuide} from '../../actions/';
import { connect } from 'react-redux';

class GuideBarContainer extends Component {
    onClickGuide = (guide) => {
        
        this.props.addGuide(guide);
    }
    render() {
        return (
                <GuideBar guideArray = {this.props.guideArray} onClickGuide = {this.onClickGuide}/>
                );
    }
}

const mapStateToProps = (state) => {
    return {
        guideArray: state.guideReducer.guideArray,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addGuide: (guide) => {
            dispatch(addGuide(guide))
        }
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(GuideBarContainer);