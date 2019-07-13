import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Creatable } from 'react-select';
import { AsyncCreatable } from 'react-select';
var Select = require('react-select');

class TagsInputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'creatable': true
        }
    }
    getInitialState = () => {
        return {
            backspaceRemoves: true,
            multi: true,
            creatable: true
        };
    }
    onChange = (value) => {
        this.setState({
            value: value,
        });
    }

    switchToMulti = () => {
        this.setState({
            multi: true,
            value: [this.state.value],
        });
    }
    switchToSingle = () => {
        this.setState({
            multi: false,
            value: this.state.value ? this.state.value[0] : null
        });
    }
    getUsers = (input) => {
        if (!input) {
            return Promise.resolve({options: []});
        }

        return fetch(`https://api.github.com/search/users?q=${input}`)
                .then((response) => response.json())
                .then((json) => {
                    return {options: json.items};
                });
    }

    toggleBackspaceRemoves = () => {
        this.setState({
            backspaceRemoves: !this.state.backspaceRemoves
        });
    }
    toggleCreatable = () => {
        this.setState({
            creatable: !this.state.creatable
        });
    }
    render() {
        {
            console.log(this.state.creatable)
        }
        {
            console.log('this.state.creatable')
        }

        return (
                <div className="section">
                    <h3 className="section-heading">{this.props.label}</h3>
                    <AsyncCreatable multi={true} 
                                    value={this.state.value}
                                    onChange={this.onChange} 
                                    valueKey="id" 
                                    labelKey="login" 
                                    placeholder="&#128269; Search"
                                    loadOptions={this.getUsers} 
                                    promptTextCreator={(name) => name + ' '}
                                    backspaceRemoves={this.state.backspaceRemoves} />
                </div>
                );
    }
}

TagsInputBar.propTypes = {
    label: PropTypes.string,
}
export default TagsInputBar;