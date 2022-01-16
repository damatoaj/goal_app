import React from 'react';
import { User } from '../../interfaces/user.model';
import { Outlet, Link } from 'react-router-dom';

type authHeaderProps = {
    user: User;
    logoutHandler: () => void;
};

const AuthHeader: React.FC <authHeaderProps> = (props) => {
    return (
        <header>
            {props.user.name}
            <button onClick={props.logoutHandler}>
                <Link to="/">Logout</Link>
            </button>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/newOutcome'>Outcome Goals</Link>
                </li>
            </ul>
            <Outlet />
        </header>
    )
};

export default AuthHeader;