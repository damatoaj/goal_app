import React from 'react';
import {User} from '../../interfaces/user.model';

import RegHeader from './RegHeader';
import AuthHeader from './AuthHeader';

type headerProps = {
    user: User | null;
    logoutHandler: ()=> void;
}

const Header:React.FC <headerProps> = (props) => {
    return (
        props.user ? <AuthHeader user={props.user} logoutHandler={props.logoutHandler} /> : <RegHeader />
    )
};

export default Header;