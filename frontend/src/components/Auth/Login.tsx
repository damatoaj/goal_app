import axios from 'axios';
import React, { FormEvent, useRef} from 'react';
import { User } from '../../interfaces/user.model';
import setAuthToken from '../../utils/setAuthToken';

type loginProps = {
    handleAuth: (user:User)=> void;
}

const Login:React.FC<loginProps> = (props) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (e:FormEvent)=> {
        e.preventDefault();
        const enteredEmail = emailInputRef.current!.value.trim();
        const enteredPassword = passwordInputRef.current!.value.trim();
        try {
            const resp = await axios.post(`http://localhost:3000/login`, {email:enteredEmail, password:enteredPassword})
            localStorage.setItem('jwtToken', resp.data.token);
            setAuthToken(resp.data.token)
            props.handleAuth(resp.data.user);
        } catch (err) {
            console.log(`⛔️ Rutro:\n`, err)
        };
    };

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={emailInputRef} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordInputRef} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;