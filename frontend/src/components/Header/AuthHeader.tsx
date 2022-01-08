import React from 'react';
import { User } from '../../interfaces/user.model';
import { Link } from 'react-router-dom';

type authHeaderProps = {
    user: User;
    logoutHandler: () => void;
};

const AuthHeader: React.FC <authHeaderProps> = (props) => {
    return (
        <header>
            {props.user.name}
            <button onClick={props.logoutHandler}>Logout</button>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to=''>Outcome Goals</Link>
                </li>
                <li>
                    <Link to=''>New Goal</Link>
                </li>
            </ul>
        </header>
    )
};

export default AuthHeader;