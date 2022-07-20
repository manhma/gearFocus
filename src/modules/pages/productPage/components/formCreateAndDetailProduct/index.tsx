import { faCircleArrowLeft, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, FormGroup, Input, Label } from 'reactstrap';
import { getRequest, postRequest } from '../../../../../services/apiServices';
import { CreateProductSchema } from '../../../../../utils/validate.util';
import InputAutocomplate from '../../../../common/components/autocomplete/InputAutocomplate';
import MultiSelect from '../../../../common/components/dropdown/MultiSelect';
import Footer from '../../../../common/components/footerPage/Footer';
import InputForm from '../../../../common/components/inputForm';
import Jodit from '../../../../common/components/joditEditor/Jodit';
import SwitchForm from '../../../../common/components/switchForm/SwitchForm';
import UploadImage from '../../../../common/components/uploadImage/UploadImage';
import Shipping from '../../createProduct/components/Shipping';
import './FormProduct.scss';

type Props = {
    title: string;
    buttonSubmit: string;
    initFormValue: any;
};

// const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

const listMemberShip = [
    { id: null, name: '' },
    { id: '4', name: 'General' },
];
const listOgTagType = [
    { id: '0', name: 'Autogenerated' },
    { id: '1', name: 'Custom' },
];
const listMetaType = [
    { id: 'A', name: 'Autogenerated' },
    { id: 'C', name: 'Custom' },
];
function FormCreateAndDetailProduct({ initFormValue, title, buttonSubmit }: Props) {
    const navigate = useNavigate();
    const [listVendor, setListVendor] = useState<any>([]);
    const [listBrand, setListBrand] = useState<any>([]);
    const [listCategory, setListCategory] = useState<any>([]);
    const [shippingData, setShippingData] = useState<any>([{ id: '1', price: '0' }]);

    const handleAddShippingData = (id: number | string, price: number | string) => {
        setShippingData([...shippingData, { id, price }]);
    };

    const handleRemoveShippingData = (id: number | string) => {
        const newShippingData = shippingData.filter((item: any) => item.id !== id);
        setShippingData(newShippingData);
    };

    const handleChangeShippingData = (id: number | string, price: number | string) => {
        const newShippingData = shippingData.map((item: any) => {
            if (item.id === id) {
                return { id, price };
            }
            return item;
        });
        setShippingData(newShippingData);
    };

    const onSubmitForm = async (values: any) => {
        const formData = new FormData();
        formData.append('productDetail', JSON.stringify(values));
        const res = await postRequest('apiAdmin/products/create', formData, 'multipart/form-data');
    };

    useEffect(() => {
        const getVendor = async () => {
            const res = await getRequest('apiAdmin/vendors/list');
            setListVendor(res.body.data);
        };

        const getBrand = async () => {
            const res = await getRequest('apiAdmin/brands/list');
            setListBrand(res.body.data);
        };
        const getCategory = async () => {
            const res = await getRequest('api/categories/list');
            setListCategory(res.body.data);
        };
        getVendor();
        getBrand();
        getCategory();
    }, []);
    return (
        <div className="home-page">
            <div>
                <FontAwesomeIcon icon={faCircleArrowLeft} className="back-icon" onClick={() => navigate(-1)} />
                <h2>{title}</h2>
                <Formik
                    initialValues={initFormValue}
                    validationSchema={CreateProductSchema}
                    onSubmit={(values: any) => {
                        const newValues = {
                            ...values,
                            shipping_to_zones: shippingData,
                            memberships: values.memberships ? [values.memberships] : [],
                            price: values.price.toString(),
                            sale_price: values.sale_price.toString(),
                            quantity: values.quantity.toString(),
                        };
                        console.log('values: ', {
                            ...values,
                            shipping_to_zones: shippingData,
                            memberships: values.memberships ? [values.memberships] : [],
                            price: values.price.toString(),
                            sale_price: values.sale_price.toString(),
                            quantity: values.quantity.toString(),
                        });
                        onSubmitForm(newValues);
                    }}
                >
                    {({ errors, touched, values, setValues, isValid }) => (
                        <Form>
                            <div className="col-md-7 create-product-form">
                                <Field name="vendor_id">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <FormGroup row>
                                            <Label sm={4}>Vendor *</Label>
                                            <Col sm={8}>
                                                <InputAutocomplate
                                                    field={field}
                                                    meta={meta}
                                                    data={listVendor}
                                                    paramName="vendor_id"
                                                    values={values}
                                                />
                                            </Col>
                                        </FormGroup>
                                    )}
                                </Field>

                                <Field name="name">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Product Title *"
                                            name="name"
                                            type="text"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                        />
                                    )}
                                </Field>
                                <Field name="brand_id">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Brand *"
                                            name="brand_id"
                                            type="select"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                            data={listBrand}
                                        />
                                    )}
                                </Field>

                                {/* <FormGroup row>
                                    <Label sm={4}>Conditon </Label>
                                    <Col sm={8}>
                                        <Input type="select" className="filter-input" />
                                    </Col>
                                </FormGroup> */}
                                <Field name="sku">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="SKU"
                                            name="sku"
                                            type="text"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                        />
                                    )}
                                </Field>

                                <FormGroup row>
                                    <Label sm={4}>Images *</Label>
                                    <Col sm={8}>
                                        <Field name="imagesOrder">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <UploadImage setValues={setValues} />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4}>Category</Label>
                                    <Col sm={8}>
                                        <Field name="categories">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <MultiSelect
                                                    dataSelect={listCategory}
                                                    paramName="categories"
                                                    setValue={setValues}
                                                />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4}>Description *</Label>
                                    <Col sm={8}>
                                        <Field name="description">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <div>
                                                    <Jodit
                                                        field={field}
                                                        placeholder="Text"
                                                        paramName="description"
                                                        setValues={setValues}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4}>Available for sale</Label>
                                    <Col sm={8}>
                                        <Field name="participate_sale">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <SwitchForm field={field} />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                            </div>

                            <div className="space-block"></div>

                            <div className="title-add-user">Prices & Inventory</div>

                            <div className="col-md-7 create-product-form">
                                <Field name="memberships">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Memberships"
                                            name="memberships"
                                            type="select"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                            data={listMemberShip}
                                        />
                                    )}
                                </Field>
                                <FormGroup row>
                                    <Label sm={4}>Tax class</Label>
                                    <Col sm={8} className="tax-exempt">
                                        <div className="tax-defaut">Default</div>
                                        <Field type="checkbox" name="tax_exempt" />
                                        <div>Tax Exempt</div>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4}>Price</Label>
                                    <Col sm={8} className="tax-exempt">
                                        <div className="price-create">
                                            <FontAwesomeIcon icon={faDollarSign} />
                                            <Field
                                                type="number"
                                                placeholder="0.00"
                                                name="price"
                                                className="input-price"
                                            />
                                            <div className="sale-check">
                                                <input type="checkbox" />
                                                <div>Sale</div>
                                            </div>
                                            <Field component="select" name="sale_price_type" className="input-price">
                                                <option value="$">$</option>
                                                <option value="%">%</option>
                                            </Field>
                                            <Field
                                                type="number"
                                                placeholder="0.00"
                                                name="sale_price"
                                                className="input-price"
                                            />
                                        </div>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={4}>Arrival date</Label>
                                    <Col sm={8} className="tax-exempt">
                                        <Field name="arrival_date">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <input
                                                    {...field}
                                                    type="date"
                                                    // defaultValue={new Date().toISOString().split('T')[0]}
                                                />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                <Field name="quantity">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Quantity in stock *"
                                            name="quantity"
                                            type="number"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="space-block"></div>

                            <div className="title-add-user">Shipping</div>
                            <div className="col-md-7 create-product-form">
                                <Field>
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <Shipping
                                            handleAddShippingData={handleAddShippingData}
                                            handleRemoveShippingData={handleRemoveShippingData}
                                            handleChangeShippingData={handleChangeShippingData}
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className="space-block"></div>

                            <div className="title-add-user">Marketing</div>
                            <div className="col-md-5 create-product-form">
                                <Field name="og_tags_type">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Open Graph meta tags"
                                            name="og_tags_type"
                                            type="select"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                            data={listOgTagType}
                                        />
                                    )}
                                </Field>
                                {values.og_tags_type === '1' && (
                                    <Field name="og_tags">
                                        {({ field, form: { touched, errors }, meta }: any) => (
                                            <InputForm
                                                label=" "
                                                name="og_tags"
                                                type="text"
                                                field={field}
                                                meta={meta}
                                                className="filter-input"
                                            />
                                        )}
                                    </Field>
                                )}

                                <Field name="meta_desc_type">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Meta description"
                                            name="meta_desc_type"
                                            type="select"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                            data={listMetaType}
                                        />
                                    )}
                                </Field>
                                {values.meta_desc_type === 'C' && (
                                    <Field name="meta_description">
                                        {({ field, form: { touched, errors }, meta }: any) => (
                                            <InputForm
                                                label=" "
                                                name="meta_description"
                                                type="text"
                                                field={field}
                                                meta={meta}
                                                className="filter-input"
                                            />
                                        )}
                                    </Field>
                                )}
                                <Field name="meta_keywords">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Meta keywords"
                                            name="meta_keywords"
                                            type="text"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                        />
                                    )}
                                </Field>
                                <Field name="product_page_title">
                                    {({ field, form: { touched, errors }, meta }: any) => (
                                        <InputForm
                                            label="Product page title"
                                            name="product_page_title"
                                            type="text"
                                            field={field}
                                            meta={meta}
                                            className="filter-input"
                                        />
                                    )}
                                </Field>
                                <FormGroup row>
                                    <Label sm={4}>Add to Facebook product feed</Label>
                                    <Col sm={8}>
                                        <Field name="facebook_marketing_enabled">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <SwitchForm field={field} />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={4}>Add to Google product feed</Label>
                                    <Col sm={8}>
                                        <Field name="google_feed_enabled">
                                            {({ field, form: { touched, errors }, meta }: any) => (
                                                <SwitchForm field={field} />
                                            )}
                                        </Field>
                                    </Col>
                                </FormGroup>
                            </div>
                            <Footer>
                                <Button type="submit" className={isValid ? 'btn-update-user' : ''}>
                                    {buttonSubmit}
                                </Button>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default FormCreateAndDetailProduct;
