import React from 'react';
import {connect} from 'react-redux';
import Ceshi2 from './ceshi2';

var MyContainer = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        };
    },
    onChildChanged: function (newState) {
        this.setState({
            checked: newState
        });
    },
    render: function() {
        var isChecked = this.state.checked ? 'yes' : 'no';
        return (
            <div>
                <div>Are you checked: {isChecked}</div>
                <ToggleButton text="Toggle me"
                              initialChecked={this.state.checked}
                              callbackParent={this.onChildChanged}
                />
            </div>

        );
    }
});