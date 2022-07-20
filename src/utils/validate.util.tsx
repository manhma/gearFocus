import * as Yup from 'yup';
import { VALIDATE_MESSAGE } from '../constants/message.constants';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email(VALIDATE_MESSAGE.INVALIDATE_EMAIL).required(VALIDATE_MESSAGE.REQUIRED),
    password: Yup.string()
        .min(6, VALIDATE_MESSAGE.TO_SHORT)
        .max(50, VALIDATE_MESSAGE.TO_LONG)
        .required(VALIDATE_MESSAGE.REQUIRED),
});
export const CreateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    lastName: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    email: Yup.string().email(VALIDATE_MESSAGE.INVALIDATE_EMAIL).required(VALIDATE_MESSAGE.REQUIRED),
    password: Yup.string()
        .min(6, VALIDATE_MESSAGE.TO_SHORT)
        .max(50, VALIDATE_MESSAGE.TO_LONG)
        .required(VALIDATE_MESSAGE.REQUIRED),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
export const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    lastName: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    email: Yup.string().email(VALIDATE_MESSAGE.INVALIDATE_EMAIL).required(VALIDATE_MESSAGE.REQUIRED),
    password: Yup.string().min(6, VALIDATE_MESSAGE.TO_SHORT).max(50, VALIDATE_MESSAGE.TO_LONG),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
export const CreateProductSchema = Yup.object().shape({
    vendor_id: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    name: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    brand_id: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    // images: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
    quantity: Yup.string().required(VALIDATE_MESSAGE.REQUIRED),
});
