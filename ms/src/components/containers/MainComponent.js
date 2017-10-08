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
import {searchCars, getParamsFromUrl} from '../../actions/';

class MainComponent extends Component {
    componentWillMount = () => {
        var url = window.location.href;
        var arr = url.split("/");
        var b = {};
        b = arr[3].split("-");
        var items = [];
        for (var i = 0; i < b.length; i++) {
            if(b[i] === 'newcars'){
                continue;
            }
            var item = {};
            item['label'] = b[i];
            item['id'] = b[i];
            item['type'] = 'na';
            items.push(item);
        }
        this.props.getParamsFromUrl(items);
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
        getParamsFromUrl: (value) => {
            dispatch(getParamsFromUrl(value))
        }
    }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(MainComponent);