import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postRequest } from '../../../../services/apiServices';
import Loading from '../../../common/components/loading/Loading';
import FormCreateAndDetailProduct from '../components/formCreateAndDetailProduct';

type Props = {};

function ProductDetail({}: Props) {
    const location = useLocation();
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
        />
    );
}

export default ProductDetail;
