import React, { Component }
from 'react';
import SliderBar from '../presentational/SliderBar';
import {onClickSlide} from '../../actions/';
import { connect } from 'react-redux';


class SliderBarContainer extends Component {
    constructor() {
        super();
        this.state = {priceOpen: false, kmsOpen: false, yearOpen: false, sortOpen: false};
    }
    onClickSlidePrice = (id) => {
        this.props.onClickSlide('price', id);
    }
    onClickSlideSort = (id) => {
        this.props.onClickSlide('sort', id);
    }
    onClickSlideKms = (id) => {
        this.props.onClickSlide('kms', id);
    }
    onClickSlideYear = (id) => {
        this.props.onClickSlide('year', id);
    }
    onClickPriceTab = () => {
        this.setState({priceOpen: !this.state.priceOpen})
    }
    onClickKmsTab = () => {
        this.setState({kmsOpen: !this.state.kmsOpen})
    }
    onClickYearTab = () => {
        this.setState({yearOpen: !this.state.yearOpen})
    }
    onClickSortTab = () => {
        this.setState({sortOpen: !this.state.sortOpen})
    }
    onBlur = (el) => {
        this.setState({
            [el]: false
        });
    }
    render() {
        return (
                <SliderBar  onBlur={this.onBlur}
                            yearOpen={this.state.yearOpen} 
                            kmsOpen={this.state.kmsOpen} 
                            priceOpen={this.state.priceOpen}
                            onClickYearTab = {this.onClickYearTab} 
                            onClickKmsTab = {this.onClickKmsTab}   
                            onClickPriceTab = {this.onClickPriceTab}
                            onClickSortTab = {this.onClickSortTab}
                            onClickSlidePrice = {this.onClickSlidePrice} 
                            onClickSlideKms = {this.onClickSlideKms} 
                            onClickSlideYear = {this.onClickSlideYear} 
                            onClickSlideSort = {this.onClickSlideSort} 
                            />
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
        onClickSlide: (type, range) => {
            dispatch(onClickSlide(type, range));
        }
    }
}
export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(SliderBarContainer);