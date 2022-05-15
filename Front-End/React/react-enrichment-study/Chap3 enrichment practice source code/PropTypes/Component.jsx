import React from 'react'

function PropComponent(props) {
    return <div>{props.name}</div>
}


PropComponent.defaultProps = {
    name: "jimin",
    age: 23,
};

PropComponent.propTypes = {
    name: PropTypes.string,
    age: function(props, propName, componentName) {
        if (!/(7|23)/.test(props[propName])) {
            return new Error(
            'Invalid prop `' + 
            propName + 
            '(' + 
            props[propName] + 
            ')' +
            '` supplied to' +
            ' `' + 
            componentName + 
            '`. Validation failed.'
            );
        }
    },
}

export default function Component() {
    return (
        <div>
            <PropComponent />
        </div>
    )
}
