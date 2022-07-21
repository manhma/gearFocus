import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootRouter } from '../../../../configs/router.config';
import { postRequest } from '../../../../services/apiServices';
import Loading from '../../../common/components/loading/Loading';
import FormCreateAndDetailProduct from '../components/formCreateAndDetailProduct';

type Props = {};

function ProductDetail({}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.search.split('=')[1];

    const [isLoading, setIsLoading] = useState(true);

    const [productInfo, setProductInfo] = useState<any>({});

    const initFormValue = {
        ...productInfo,
        participate_sale: productInfo.participate_sale === '0' ? false : true,
        memberships: productInfo.memberships === [] ? '' : '4',
        tax_exempt: productInfo.tax_exempt === '0' ? false : true,
        arrival_date: productInfo.arrival_date
            ? new Date(productInfo.arrival_date * 1000).toISOString().split('T')[0]
            : '',
        facebook_marketing_enabled: productInfo.facebook_marketing_enabled === '0' ? false : true,
        google_feed_enabled: productInfo.google_feed_enabled === '0' ? false : true,
        imagesOrder: productInfo.images,
    };

    const onUpdateProduct = async (values: any) => {
        const formData = new FormData();
        formData.append('productDetail', JSON.stringify(values));
        const res = await postRequest('apiAdmin/products/create', formData, 'multipart/form-data');
        console.log('res: ', res);
        if (res.body.success) {
            alert('Update product thành công');
            navigate(RootRouter.PRODUCT);
        } else {
            alert('Thất bại');
        }
    };

    useEffect(() => {
        const getProductInfo = async () => {
            const res = await postRequest('apiAdmin/products/detail', { id: productId });
            setIsLoading(false);
            setProductInfo(res.body.data);
        };
        getProductInfo();
    }, []);

    return isLoading ? (
        <Loading isOpen={isLoading} />
    ) : (
        <FormCreateAndDetailProduct
            title={productInfo.name}
            buttonSubmit="Update Product"
            initFormValue={initFormValue}
            onSubmitForm={onUpdateProduct}
        />
    );
}

export default ProductDetail;
