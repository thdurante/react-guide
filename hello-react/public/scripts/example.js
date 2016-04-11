/** Manual transfer */
function FancyCheckbox(props) {
    var fancyClass = props.checked ? 'FancyChecked' : 'FancyUnchecked';
    return (
        <div className={fancyClass} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
ReactDOM.render(
    <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
        Hello world!
    </FancyCheckbox>,
    document.getElementById('example')
);

/** Transferring with ... in JSX */
function FancyCheckbox(props) {
    var { checked, ...other } = props;
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    // `other` contains { onClick: console.log } but not the checked property
    return (
        <div {...other} className={fancyClass} />
    );
}
ReactDOM.render(
    <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
        Hello world!
    </FancyCheckbox>,
    document.getElementById('example')
);