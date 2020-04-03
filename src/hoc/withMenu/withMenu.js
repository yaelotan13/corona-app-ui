import React, { Fragment } from 'react';
import Menu from '../../Components/layout/Menu/Menu';

const WithMenu = (WrappedComponent) => {
    return (props) => (
        <Fragment>
            <Menu />
            <WrappedComponent {...props} />
        </Fragment>
    )
};

export default WithMenu;
