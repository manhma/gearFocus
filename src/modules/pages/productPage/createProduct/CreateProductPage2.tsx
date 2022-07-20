import FormCreateAndDetailProduct from '../components/formCreateAndDetailProduct';

type Props = {};

function CreateProductPage2({}: Props) {
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
    return <FormCreateAndDetailProduct title="Product" buttonSubmit="Add Product" initFormValue={initFormValue} />;
}

export default CreateProductPage2;
