import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootRouter } from '../../../../configs/router.config';
import { postRequest } from '../../../../services/apiServices';
import LoginForm from '../../components/loginForm';
import './LoginPage.scss';

type Props = {};

function LoginPage({}: Props) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await postRequest('api/authentication/login', { email: email, password: password });
            if (res.body.success) {
                localStorage.setItem('token', res.body.user_cookie);

                navigate(RootRouter.USER, { replace: true });
            } else {
                setErrorMessage(res.body.errors.email);
            }
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="login-page">
            <LoginForm isLoading={isLoading} onSubmit={onSubmit} errorMessage={errorMessage} />
        </div>
    );
}

export default LoginPage;
