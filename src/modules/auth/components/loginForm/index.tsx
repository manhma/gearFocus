import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { LoginSchema } from '../../../../utils/validate.util';
import Button from '../../../common/components/button';
import FormErrorMessage from '../../../common/components/formErrorMessage';
import InputForm from '../../../common/components/inputForm';
import './LoginForm.scss';

interface ILoginForm {
    isLoading: boolean;
    errorMessage: string;
    onSubmit: (email: string, password: string) => void;
}

function LoginForm({ isLoading, errorMessage, onSubmit }: ILoginForm) {
    const initFormValue = {
        email: '',
        password: '',
    };
    return (
        <div className="login-page">
            <div className="login-form">
                <div className="text-center">
                    <h1 className="mb-4">Login</h1>
                </div>
                <Formik
                    initialValues={initFormValue}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        onSubmit(values.email, values.password);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="email">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        // label="Email"
                                        name="email"
                                        type="email"
                                        field={field}
                                        meta={meta}
                                        placeholder="Enter your email"
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        // label="Password"
                                        name="password"
                                        type="password"
                                        field={field}
                                        meta={meta}
                                        placeholder="Enter your password"
                                    />
                                )}
                            </Field>
                            <FormErrorMessage message={errorMessage} />
                            <Button type="submit" title="Login" isLoading={isLoading} color="primary" />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginForm;
