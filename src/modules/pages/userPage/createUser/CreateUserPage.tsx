import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, FormGroup, Label } from 'reactstrap';
import { RootRouter } from '../../../../configs/router.config';
import { getRequest, postRequest } from '../../../../services/apiServices';
import { CreateUserSchema } from '../../../../utils/validate.util';
import MultiSelect from '../../../common/components/dropdown/MultiSelect';
import Footer from '../../../common/components/footerPage/Footer';
import InputForm from '../../../common/components/inputForm';
import Jodit from '../../../common/components/joditEditor/Jodit';
import './CreateUser.scss';
type Props = {};

const paymentRailsType = [
    { id: 'individual', name: 'Individual' },
    { id: 'business', name: 'Business' },
];
const accessLevel = [
    { id: '10', name: 'Vendor' },
    { id: '100', name: 'Admin' },
];
const memberShips = [
    { id: '', name: 'Ignore MemberShip' },
    { id: '4', name: 'General' },
];

function CreateUserPage({}: Props) {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<any>([]);
    const initFormValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        paymentRailsType: 'individual',
        access_level: '10',
        // roles: ['1'],
        membership_id: '',
        forceChangePassword: false,
        taxExempt: false,
    };

    const onSubmitCreateuser = async (values: any) => {
        const res = await postRequest('apiAdmin/users/create', values);
        console.log('res: ', res);
        if (res.body.success) {
            alert('Tạo user thành công');
            navigate(RootRouter.USER);
        } else {
            alert('Thất bại');
        }
    };

    useEffect(() => {
        const getRole = async () => {
            const res = await getRequest('apiAdmin/commons/role');
            setRoles(res.body.data.administrator);
        };
        getRole();
    }, []);

    return (
        <div className="home-page">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back-icon" onClick={() => navigate(-1)} />
            <h2>Create profile</h2>

            <Formik
                initialValues={initFormValue}
                validationSchema={CreateUserSchema}
                onSubmit={(values: any) => {
                    const newValue = {
                        ...values,
                        forceChangePassword: values.forceChangePassword ? 1 : 0,
                        taxExempt: values.taxExempt ? 1 : 0,
                    };
                    console.log('newValue: ', newValue);
                    onSubmitCreateuser(newValue);
                }}
            >
                {({ errors, touched, values, setValues, isValid }) => (
                    <Form>
                        <div className="title-add-user">Email & password</div>

                        <div className="col-md-5 create-user-form">
                            <Field name="firstName">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="First Name *"
                                        name="firstName"
                                        type="text"
                                        field={field}
                                        meta={meta}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <Field name="lastName">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Last Name *"
                                        name="lastName"
                                        type="text"
                                        field={field}
                                        meta={meta}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <Field name="email">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Email *"
                                        name="email"
                                        type="email"
                                        field={field}
                                        meta={meta}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Password *"
                                        name="password"
                                        type="password"
                                        field={field}
                                        meta={meta}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <Field name="confirm_password">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Confirm password *"
                                        name="confirm_password"
                                        type="password"
                                        field={field}
                                        meta={meta}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <Field name="paymentRailsType">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Type"
                                        name="paymentRailsType"
                                        type="select"
                                        field={field}
                                        meta={meta}
                                        data={paymentRailsType}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                        </div>

                        <div className="space-block"></div>

                        <div className="title-add-user">Access information</div>

                        <div className="col-md-5 create-user-form">
                            <Field name="access_level">
                                {({ field, form: { touched, errors }, meta }: any) => {
                                    field.onChange = (e: any) => {
                                        setValues((prev: any) => ({
                                            ...prev,
                                            access_level: e.target.value,
                                            roles: ['1'],
                                        }));
                                    };
                                    return (
                                        <InputForm
                                            label="Access level "
                                            name="access_level"
                                            type="select"
                                            field={field}
                                            meta={meta}
                                            data={accessLevel}
                                            className="filter-input"
                                        />
                                    );
                                }}
                            </Field>
                            {values.access_level === '100' ? (
                                <FormGroup row>
                                    <Label sm={4}>Roles</Label>
                                    <Col sm={8}>
                                        <Field name="role">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <MultiSelect
                                                    dataSelect={roles}
                                                    paramName="roles"
                                                    setValue={setValues}
                                                    defautValueId={['1']}
                                                />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                            ) : (
                                <></>
                            )}
                            <Field name="membership_id">
                                {({ field, form: { touched, errors }, meta }: any) => (
                                    <InputForm
                                        label="Membership "
                                        name="membership_id"
                                        type="select"
                                        field={field}
                                        meta={meta}
                                        data={memberShips}
                                        className="filter-input"
                                    />
                                )}
                            </Field>
                            <label style={{ display: 'flex' }}>
                                <div style={{ width: '30%', marginRight: '5%' }}>
                                    Require to change password on next log in
                                </div>
                                <Field type="checkbox" name="forceChangePassword" />
                            </label>
                        </div>
                        <div className="space-block"></div>

                        <div className="title-add-user">Tax information</div>

                        <div className="col-md-5 create-user-form">
                            <label style={{ display: 'flex' }}>
                                <div style={{ width: '30%', marginRight: '5%' }}>Tax exempt</div>
                                <Field type="checkbox" name="taxExempt" />
                            </label>
                        </div>
                        <Footer>
                            <Button type="submit" className={isValid ? 'btn-update-user' : ''}>
                                Create Account
                            </Button>
                        </Footer>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateUserPage;
