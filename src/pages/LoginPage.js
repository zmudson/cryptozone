import React from 'react';
import '../styles/LoginPage.css';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ login }) => {
    return (
        <section className='login-page'>
            <LoginForm login={login} />
        </section>

    );
}

export default LoginPage;
