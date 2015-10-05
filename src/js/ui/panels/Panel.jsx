'use strict';

var React = require('react');
var Application = require('../../core/Application.js');
var Splitter = require('./Splitter.jsx');

var Panel = React.createClass({
    getDefaultProps: function() {
        return {
            shouldUpdate: true,
            direction: 'vertical',
            stretch: false
        };
    },

    getInitialState: function() {
        var props = this.props;

        return {
            visible: props.visible || true,
            dragging: false,
            height: props.height,
            width: props.width,
            minHeight: props.minHeight || 0,
            minWidth: props.minWidth || 0,
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0
        };
    },

    componentDidMount: function() {
        var props = this.props;

        Application.on('mouseup', function() {
            if (this.state.dragging) {
                this.setState({
                    dragging: false
                },
                function() {
                    if (props.onDragEnd) {
                        props.onDragEnd();
                    }
                });
            }
        }.bind(this));
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.shouldUpdate;
    },

    handleStartDrag: function(e) {
        var props = this.props,
            state = this.state;

        this.setState({
            dragging: true,
            startX: e.pageX,
            startY: e.pageY,
            startWidth: state.width,
            startHeight: state.height
        }, function() {
            if (props.onDragStart) {
                props.onDragStart(this);
            }
        });

        e.stopPropagation();
        e.preventDefault();
    },

    handleMouseMove: function(e) {
        var val,
            state = this.state;

        if (state.dragging) {
            val = state.startHeight + e.pageY - state.startY;
            if (val < state.minHeight) {
                val = state.minHeight;
            }

            this.setState({ height: val });
        }

        e.stopPropagation();
        e.preventDefault();
    },

    render: function() {
        var props = this.props,
            state = this.state,
            classes = 'panel',
            style = (state.height) ? { height: state.height} : null;

        classes += (props.direction == 'vertical') ? ' panel-vertical' : ' panel-horizontal';

        if (props.stretch) {
            classes += ' panel-stretch';
        }

        var splitter = (props.resizable) ?
            <Splitter type="horizontal" onDragStart={this.handleStartDrag} /> : null;

        return (
            <div className={classes} style={style}>
                <div className="title">{this.props.title}</div>
                {this.props.children}
                {splitter}
            </div>
        );
    }
});

module.exports = Panel;