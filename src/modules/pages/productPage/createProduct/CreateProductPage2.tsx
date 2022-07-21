import { useNavigate } from 'react-router-dom';
import { RootRouter } from '../../../../configs/router.config';
import { postRequest } from '../../../../services/apiServices';
import FormCreateAndDetailProduct from '../components/formCreateAndDetailProduct';

type Props = {};

function CreateProductPage2({}: Props) {
    const navigate = useNavigate();
    const initFormValue = {
        vendor_id: '',
        name: '',
        brand_id: '',
        condition_id: '294',
        sku: '',
        imagesOrder: [],
        categories: [],
        description: '',
        participate_sale: true,
        memberships: '',
        tax_exempt: false,
        price: '',
        sale_price_type: '$',
        sale_price: '',
        arrival_date: new Date().toISOString().split('T')[0],
        quantity: '',
        og_tags_type: '0',
        og_tags: '',
        meta_desc_type: 'A',
        meta_description: '',
        meta_keywords: '',
        product_page_title: '',
        facebook_marketing_enabled: false,
        google_feed_enabled: false,
        inventory_tracking: 0,
        deleted_images: [],
    };
    const onCreateProduct = async (values: any) => {
        const formData = new FormData();
        formData.append('productDetail', JSON.stringify(values));
        const res = await postRequest('apiAdmin/products/create', formData, 'multipart/form-data');
        console.log('res: ', res);
        if (res.body.success) {
            alert('Tạo product thành công');
            navigate(RootRouter.PRODUCT);
        } else {
            alert('Thất bại');
        }
    };
    return (
        <FormCreateAndDetailProduct
            title="Product"
            buttonSubmit="Add Product"
            initFormValue={initFormValue}
            onSubmitForm={onCreateProduct}
        />
    );
}

export default CreateProductPage2;
