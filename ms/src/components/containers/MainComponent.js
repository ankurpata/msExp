import React, { Component } from 'react';
import Header from '../presentational/Header';
import Loader from '../presentational/Loader';
import Footer from '../presentational/Footer';
import SimilarLinks from '../presentational/SimilarLinks';
import GuideBarContainer from './GuideBarContainer';
import SliderBarContainer from './SliderBarContainer';
import BodyContainer from './BodyContainer';
import fetch from 'isomorphic-fetch';


import { connect } from 'react-redux';
import {searchCars} from '../../actions/';

class MainComponent extends Component {
    componentWillMount = () => {
//        this.props.searchCars('');
    }
    render() {
        return (<div>
                    <Header searchTerm = 'asdfa'>
                    </Header>
                    <GuideBarContainer />
                    <SliderBarContainer />
                    <Loader />
                    <BodyContainer />
                    <SimilarLinks similarLinks = {this.props.similarLinksData}/>
                    <Footer />
                </div>
                );
    }

}
const mapStateToProps = (state) => {
    return {
        hasErrored: state.hasErrored.hasErrored,
        similarLinksData: state.similarLinksData.similarLinksData
    }
}

const mapDispatchToProps = dispatch => {
    return {
//        updateTagAndSearchCars: (value) => {
//            dispatch(updateTagAndSearchCars(value))
//        }
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(MainComponent);