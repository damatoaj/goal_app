import React from 'react';
import { User } from '../../interfaces/user.model';
import { Outlet, Link } from 'react-router-dom';

type authHeaderProps = {
    user: User;
    logoutHandler: () => void;
};

const AuthHeader: React.FC <authHeaderProps> = (props) => {
    return (
        <>
            <header>
                <h3>
                    Welcome {props.user.name}
                </h3>
                <nav>
                    <ul>
                        <Link to='/home'>Home</Link>
                    </ul>
                    <ul>
                        <Link to='/newOutcome'>Outcome Goals</Link>
                    </ul>
                    <ul onClick={props.logoutHandler}>
                        <Link to="/">Logout</Link>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
};

export default AuthHeader;