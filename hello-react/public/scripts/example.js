/** Prop validation */
var ComponentWithPropValidation = React.createClass({
    propTypes: {
        // You can declare that a prop is a specific JS primitive. By default, these
        // are all optional.
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,

        // Anything that can be rendered: numbers, strings, elements or an array
        // (or fragment) containing these types.
        optionalNode: React.PropTypes.node,

        // A React element.
        optionalElement: React.PropTypes.element,

        // You can also declare that a prop is an instance of a class. This uses
        // JS's instanceof operator.
        optionalMessage: React.PropTypes.instanceOf(Message),

        // You can ensure that your prop is limited to specific values by treating
        // it as an enum.
        optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

        // An object that could be one of many types
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Message)
        ]),

        // An array of a certain type
        optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

        // An object with property values of a certain type
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

        // An object taking on a particular shape
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),

        // You can chain any of the above with `isRequired` to make sure a warning
        // is shown if the prop isn't provided.
        requiredFunc: React.PropTypes.func.isRequired,

        // A value of any data type
        requiredAny: React.PropTypes.any.isRequired,

        // You can also specify a custom validator. It should return an Error
        // object if the validation fails. Don't `console.warn` or throw, as this
        // won't work inside `oneOfType`.
        customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Validation failed.'
                );
            }
        },

        // You can also supply a custom validator to `arrayOf` and `objectOf`.
        // It should return an Error object if the validation fails. The validator
        // will be called for each key in the array or object. The first two
        // arguments of the validator are the array or object itself, and the
        // current item's key.
        customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
                return new Error(
                    'Invalid prop `' + propFullName + '` supplied to' +
                    ' `' + componentName + '`. Validation failed.'
                );
            }
        })
    }
    /* ... */
});

/** Single child */
var MyComponent = React.createClass({
    propTypes: {
        children: React.propTypes.element.isRequired
    },
    render: function () {
        return (
            <div>
                {this.props.children} // This must be exactly one element or it will warn.
            </div>
        );
    }
});

/** Default prop values */
var ComponentWithDefaultProps = React.createClass({
    getDefaultProps: function() {
        return {
            value: 'default value'
        };
    }
    /* ... */
});

/** Transferring Props: A Shortcut */
var CheckLink = React.createClass({
    render: function() {
        // This takes any props passed to CheckLink and copies them to <a>
        return <a {...this.props}>{'√ '}{this.props.children}</a>;
    }
});

ReactDOM.render(
    <CheckLink href="/checked.html">
        Click here!
    </CheckLink>,
    document.getElementById('example')
);

/** Mixins */
var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>
                React has been running for {this.state.seconds} seconds.
            </p>
        );
    }
});

ReactDOM.render(
    <TickTock />,
    document.getElementById('example')
);