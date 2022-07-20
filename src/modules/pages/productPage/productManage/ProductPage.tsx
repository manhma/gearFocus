import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Tooltip } from 'reactstrap';
import { RootRouter } from '../../../../configs/router.config';
import { LIST_AVAILABILITY_STATUS, LIST_SEARCH_TYPE, LIST_STOCK_STATUS } from '../../../../constants/filter.constants';
import { postRequest } from '../../../../services/apiServices';
import InputSelect from '../../../common/components/dropdown/InputSelect';
import PaginationComponent from '../../../common/components/pagination/PaginationComponent';
import './ProductPage.scss';
import ProductTable from './components/tableProduct/ProductTable';
import Footer from '../../../common/components/footerPage/Footer';
import Loading from '../../../common/components/loading/Loading';

type Props = {};

function ProductPage({}: Props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const listCategory = useSelector((state: any) => state.productManage.category);
    const [isShowHiddenFilter, setIsShowHiddenFilter] = useState(false);
    const [listProduct, setListProduct] = useState<any>([]);
    const [recordsFiltered, setRecordsFiltered] = useState<number>(0);
    const [filter, setFilter] = useState<any>({
        availability: 'all',
        category: '0',
        count: 25,
        order_by: 'ASC',
        page: 1,
        search: '',
        search_type: [],
        sort: 'name',
        stock_status: 'all',
        vendor: '',
    });
    const handleChangeSearchType = (id: string) => {
        const checkSearchType = filter.search_type.indexOf(id) > -1;
        const newSearchType = checkSearchType
            ? filter.search_type.filter((item: any) => item !== id)
            : [...filter.search_type, id];
        setFilter((prev: any) => {
            return { ...prev, search_type: newSearchType };
        });
    };
    const [onDropdownVendor, setOnDropdownVendor] = useState(false);
    const [valueSearchVendor, setValueSearchVendor] = useState<string>('');
    const [listVendor, setListVendor] = useState<any>([]);
    const [isloadingVendor, setIsloadingVendor] = useState(false);
    const [editTable, setEditTable] = useState<any>([]);

    //edit Table Product
    const handleEditTableProduct = (editValues: any) => {
        setEditTable([...editTable, editValues]);
    };

    const onEditedTable = () => {
        const onEdit = async () => {
            const res = await postRequest('apiAdmin/products/edit', { params: editTable });
        };
        onEdit();
        setEditTable([]);
    };

    //
    const getVendor = async (value: string) => {
        const res = await postRequest('apiAdmin/vendors/list', { search: value });
        setIsloadingVendor(false);
        setListVendor(res.body.data);
    };
    const debounceDropDown = useCallback(
        debounce((nextValue) => getVendor(nextValue), 1000),
        [],
    );
    const handleChangeSearchVendor = (e: any) => {
        setIsloadingVendor(true);
        const { value } = e.target;
        setValueSearchVendor(value);
        debounceDropDown(value);
    };
    const handleChangeVendor = (id: number, name: string) => {
        setFilter((prev: any) => ({ ...prev, vendor: id }));
        setOnDropdownVendor(false);
        setValueSearchVendor(name);
    };

    const formatListProduct = (value: any) => {
        if (value) {
            const newListProduct = value.map((item: any) => {
                return { ...item, selected: false };
            });
            return newListProduct;
        }
        return [];
    };

    const handleSearchFilter = () => {
        getListProduct(filter);
    };

    //SelectProduct
    const listSelectedProductAndDelete = listProduct
        .filter((item: any) => item.selected === true)
        .map((item: any) => ({ id: item.id, delete: 1 }));

    const handleSelectProduct = (id: number) => {
        const newListProduct = listProduct.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: !item.selected,
                };
            }
            return item;
        });
        setListProduct(newListProduct);
    };
    const handleSelectAllProduct = (selectAllProduct: boolean) => {
        if (selectAllProduct) {
            const newListProduct = listProduct.map((item: any) => ({ ...item, selected: true }));
            setListProduct(newListProduct);
        } else {
            const newListProduct = listProduct.map((item: any) => ({ ...item, selected: false }));
            setListProduct(newListProduct);
        }
    };

    //DeleteProduct
    const onDeleteProduct = () => {
        const deleteProduct = async () => {
            const res = await postRequest('apiAdmin/products/edit', { params: listSelectedProductAndDelete });
        };
        deleteProduct();
        getListProduct(filter);
        setIsLoading(true);
    };

    //activeProduct
    const handleActiveProduct = (id: string | number, enabled: string) => {
        let newEnabled = '';
        if (enabled === '1') {
            newEnabled = '0';
        } else {
            newEnabled = '1';
        }
        setIsLoading(true);
        const editProduct = async () => {
            const res = await postRequest('apiAdmin/products/edit', { params: [{ id: id, enable: newEnabled }] });
            setIsLoading(false);
        };
        editProduct();
    };

    // getListProduct
    const getListProduct = async (filter: any) => {
        const res = await postRequest('api/products/list', filter);

        setListProduct(formatListProduct(res.body.data));
        setRecordsFiltered(res.body.recordsFiltered);
        setIsLoading(false);
    };

    useEffect(() => {
        getListProduct(filter);
    }, [filter.count, filter.page, isLoading]);
    return (
        <div className="home-page">
            {isLoading ? <Loading isOpen={isLoading} /> : null}
            <h2>Products</h2>
            <div>
                <div className="wrapper-filter">
                    <Input
                        placeholder="Search keywords"
                        className="filter-item filter-input"
                        onChange={(e) => setFilter((prev: any) => ({ ...prev, search: e.target.value }))}
                    />
                    <div className="filter-item">
                        <InputSelect
                            placeholder="Any category"
                            dataSelect={listCategory}
                            paramName="category"
                            setFilter={setFilter}
                        />
                    </div>
                    <div className="filter-item">
                        <InputSelect dataSelect={LIST_STOCK_STATUS} paramName="stock_status" setFilter={setFilter} />
                    </div>
                    <div className="filter-item">
                        <Button
                            className="btn-search"
                            onClick={() => {
                                handleSearchFilter();
                            }}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                {isShowHiddenFilter && (
                    <div className="hidden-filter">
                        <div className="hidden-filter-product-item">
                            <label>Search in</label>
                            <div className="filter-item">
                                {LIST_SEARCH_TYPE.map((item: any) => (
                                    <div key={item.id}>
                                        <input
                                            type="checkbox"
                                            checked={filter.search_type.indexOf(item.id) > -1}
                                            onChange={() => handleChangeSearchType(item.id)}
                                        />
                                        <label>{item.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden-filter-product-item">
                            <label>Availability</label>
                            <div className="filter-item">
                                <InputSelect
                                    dataSelect={LIST_AVAILABILITY_STATUS}
                                    paramName="availability"
                                    setFilter={setFilter}
                                />
                            </div>
                        </div>
                        <div className="hidden-filter-product-item cha-tooltip">
                            <label>Vendor</label>
                            <Input
                                className="filter-input filter-item "
                                value={valueSearchVendor}
                                onChange={handleChangeSearchVendor}
                                onFocus={() => setOnDropdownVendor(true)}
                            />
                            {isloadingVendor ? <CircularProgress size={20} /> : null}
                            {onDropdownVendor && listVendor && valueSearchVendor ? (
                                <div className="tooltip-search-vendor">
                                    {listVendor.map((item: any) => {
                                        if (item.id != -1)
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="item-vendor"
                                                    onClick={() => handleChangeVendor(item.id, item.name)}
                                                >
                                                    {item.name}
                                                </div>
                                            );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}

                <div className="arow-show-filter" onClick={() => setIsShowHiddenFilter(!isShowHiddenFilter)}>
                    {isShowHiddenFilter ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                </div>
            </div>
            <Button className="add-btn" onClick={() => navigate(RootRouter.NEW_PRODUCT)}>
                Add Product
            </Button>
            <ProductTable
                listProduct={listProduct}
                handleSelectProduct={handleSelectProduct}
                handleSelectAllProduct={handleSelectAllProduct}
                handleActiveProduct={handleActiveProduct}
                handleEditTableProduct={handleEditTableProduct}
            />
            <PaginationComponent filter={filter} setFilter={setFilter} recordsFiltered={recordsFiltered} />
            <Footer>
                <Button color="warning" disabled={editTable.length === 0} onClick={onEditedTable}>
                    Save changes
                </Button>
                <Button
                    style={{ marginLeft: '5px' }}
                    color="warning"
                    disabled={listSelectedProductAndDelete.length === 0}
                    onClick={onDeleteProduct}
                >
                    Remove selected
                </Button>
            </Footer>
        </div>
    );
}

export default ProductPage;
