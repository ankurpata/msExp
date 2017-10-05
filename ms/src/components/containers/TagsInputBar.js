import React from 'react';
import PropTypes from 'prop-types';
import { AsyncCreatable } from 'react-select';
import {searchCars, updateTags} from '../../actions/';
import { connect } from 'react-redux';

class TagsInputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state= {pageNo: 0}
        this.props.searchCars(this.props.tagsValue);
    }
    onChange = (value) => {
        this.props.updateTags(value);
        console.log('onchange is fired', value);
    }

    componentDidUpdate = () => {
        this.props.searchCars(this.props.tagsValue, this.props.pageNo);
    }
    getUsers = (input) => {
        if (!input) {
            return Promise.resolve({options: []});
        }
        return fetch(`/api/fetchSuggestions?q=${input}`)
                .then((response) => response.json())
                .then((json) => {
                    return {options: json.items};
                });
    }

    render() {
        return (
                <div className="section">
                    <h3 className="section-heading">{this.props.label}</h3>
                    <AsyncCreatable multi={true} 
                                    value={this.props.tagsValue}
                                    onChange={this.onChange} 
                                    valueKey="id" 
                                    labelKey="label" 
                                    placeholder="&#128269; Search"
                                    loadOptions={this.getUsers} 
                                    promptTextCreator={(name) => name + ' '}
                                    backspaceRemoves={true} />
                </div>
                );
    }
}

TagsInputBar.propTypes = {
    label: PropTypes.string,
};
const mapStateToProps = (state) => {
    return {
        tagsValue: state.tagReducer.tagsValue,
        pageNo: state.tagReducer.pageNo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTags: (value) => {
            dispatch(updateTags(value));
        },
        searchCars: (value, pageNo) => {
            dispatch(searchCars(value, pageNo));
        }
    }
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(TagsInputBar);