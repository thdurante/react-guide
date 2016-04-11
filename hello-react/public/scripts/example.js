/** Controlled component - input with a value */
var ControlledComponent = React.createClass({
    getInitialState: function () {
        return {value: 'Hello!'};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        return(
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
});

ReactDOM.render(
    <ControlledComponent />,
    document.getElementById('example')
);