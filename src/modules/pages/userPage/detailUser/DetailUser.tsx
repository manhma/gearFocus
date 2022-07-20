import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tab, Tabs } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { RootRouter } from '../../../../configs/router.config';
import { postRequest } from '../../../../services/apiServices';
import { CreateUserSchema, UpdateUserSchema } from '../../../../utils/validate.util';
import MultiSelect from '../../../common/components/dropdown/MultiSelect';
import Footer from '../../../common/components/footerPage/Footer';
import InputForm from '../../../common/components/inputForm';
import Loading from '../../../common/components/loading/Loading';
import './detailUser.scss';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const listMemberShip = [
    { id: '', name: 'Ignore MemberShip' },
    { id: '4', name: 'General' },
];

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function DetailUser() {
    const navigate = useNavigate();
    const [value, setValue] = useState<any>(0);
    const handleChange = (e: any, newValue: string) => {
        setValue(newValue);
    };

    const location = useLocation();
    const userId = location.search.split('=')[1];
    const [listRole, setListRole] = useState<any>([]);
    const [listStatus, setListStatus] = useState<any>([]);
    const [userInfo, setUserInfo] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    console.log('userInfo: ', userInfo);

    const formatListStatus = (object: any) => {
        const arr = [];
        for (const property in object) {
            arr.push({ id: property, name: object[property] });
        }
        return arr;
    };
    const convertNumb = (num: number) => {
        return Number(num).toFixed(2);
    };
    const convertDate = (date: number) => {
        const newDate = new Date(date * 1000);
        return moment(newDate).format('lll');
    };
    const formatRole = (role: string) => {
        if (role === '10') return 'Vendor';
        if (role === '100') return 'Administrator';
    };

    const initFormValue = {
        confirm_password: '',
        email: userInfo.email,
        firstName: userInfo.firstName,
        forceChangePassword: userInfo.forceChangePassword === 1 ? true : false,
        id: userId,
        lastName: userInfo.lastName,
        membership_id: userInfo.membership_id ? userInfo.membership_id : '',
        password: '',
        roles: userInfo.roles,
        status: userInfo.status,
        statusComment: userInfo.statusComment,
        taxExempt: userInfo.taxExempt === 1 ? true : false,
    };

    const onSubmitUpdate = async (values: any) => {
        const res = await postRequest('apiAdmin/users/edit', { params: [values] });
        console.log('res: ', res);
        if (res.body.success) {
            alert('Cập nhật thành công');
            navigate(RootRouter.USER);
        } else {
            alert('Cập nhật thất bại');
        }
    };

    useEffect(() => {
        const getUserDetail = async () => {
            const res = await postRequest('apiVendor/profile/detail', { id: userId });
            setIsLoading(false);
            setUserInfo(res.body.data.info);
            setListRole(res.body.data.account_roles);
            setListStatus(formatListStatus(res.body.data.account_status));
        };
        getUserDetail();
    }, []);

    return isLoading ? (
        <Loading isOpen={isLoading} />
    ) : (
        <div className="home-page">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back-icon" onClick={() => navigate(-1)} />
            <h3>{`${userInfo.email} (${userInfo.companyName})`}</h3>
            <Box>
                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="account detail" sx={{ color: 'white' }} />
                        <Tab label="Item Two" sx={{ color: 'white' }} />
                        <Tab label="Item Three" sx={{ color: 'white' }} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <div>
                        <Formik
                            initialValues={initFormValue}
                            validationSchema={UpdateUserSchema}
                            onSubmit={(values: any) => {
                                console.log('values: ', values);
                                const newValue = {
                                    ...values,
                                    forceChangePassword: values.forceChangePassword ? 1 : 0,
                                    taxExempt: values.taxExempt ? 1 : 0,
                                };
                                onSubmitUpdate(newValue);
                            }}
                        >
                            {({ errors, touched, values, setValues, isValid }) => (
                                <Form>
                                    <div className="acc-detail-block col-md-7">
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">
                                                Orders placed as a buyer
                                            </div>
                                            <div className="col-md-8">${convertNumb(userInfo.order_as_buyer)}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Vendor Incomer</div>
                                            <div className="col-md-8">${userInfo.income}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Vendor Expense</div>
                                            <div className="col-md-8">$0.00</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Earning balance</div>
                                            <div className="col-md-8">${convertNumb(userInfo.earning)}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">
                                                Products listed as vendor
                                            </div>
                                            <div className="col-md-8">$0.00</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Joined</div>
                                            <div className="col-md-8">{convertDate(userInfo.joined)}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Last login</div>
                                            <div className="col-md-8">{convertDate(userInfo.last_login)}</div>
                                        </div>
                                    </div>
                                    <h5 className="title-acc-detail">Email & password</h5>
                                    <div className="acc-detail-block col-md-7">
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
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Type</div>
                                            <div className="col-md-8">{userInfo.paymentRailsType}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">PaymentRails ID</div>
                                            <div className="col-md-8">{userInfo.paymentRailsId}</div>
                                        </div>
                                    </div>

                                    <h5 className="title-acc-detail">Access information</h5>
                                    <div className="col-md-7 acc-detail-block ">
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Access level</div>
                                            <div className="col-md-8">{formatRole(userInfo.access_level)}</div>
                                        </div>
                                        {userInfo.access_level === '100' ? (
                                            <div className="acc-detail-item row">
                                                <div className="acc-detail-item-label col-md-4">Role</div>
                                                <div className="col-md-8">
                                                    <Field name="roles">
                                                        {({ field, form: { touched, errors }, meta }: any) => (
                                                            <MultiSelect
                                                                dataSelect={listRole}
                                                                paramName="roles"
                                                                setValue={setValues}
                                                                defautValueId={userInfo.roles}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <Field name="status">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <InputForm
                                                    label="Account status"
                                                    name="status"
                                                    type="select"
                                                    field={field}
                                                    meta={meta}
                                                    data={listStatus}
                                                    className="filter-input"
                                                />
                                            )}
                                        </Field>
                                        <Field name="statusComment">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <InputForm
                                                    label="Status comment (reason)"
                                                    name="statusComment"
                                                    type="textarea"
                                                    field={field}
                                                    meta={meta}
                                                    // data={paymentRailsType}
                                                    className="filter-input"
                                                />
                                            )}
                                        </Field>
                                        <Field name="membership_id">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <InputForm
                                                    label="Membership"
                                                    name="membership_id"
                                                    type="select"
                                                    field={field}
                                                    meta={meta}
                                                    data={listMemberShip}
                                                    className="filter-input"
                                                />
                                            )}
                                        </Field>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Pending membership</div>
                                            <div className="col-md-8">{userInfo.pending_membership_id || 'none'}</div>
                                        </div>
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">
                                                Require to change password on next log in
                                            </div>
                                            <div className="col-md-8">
                                                <Field type="checkbox" name="forceChangePassword" />
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="title-acc-detail">Tax information</h5>
                                    <div className="col-md-7 acc-detail-block ">
                                        <div className="acc-detail-item row">
                                            <div className="acc-detail-item-label col-md-4">Tax exempt</div>
                                            <div className="col-md-8">
                                                <Field type="checkbox" name="taxExempt" />
                                            </div>
                                        </div>
                                    </div>
                                    <Footer>
                                        <Button type="submit" className={isValid ? 'btn-update-user' : ''}>
                                            Update
                                        </Button>
                                    </Footer>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </div>
    );
}

export default DetailUser;
