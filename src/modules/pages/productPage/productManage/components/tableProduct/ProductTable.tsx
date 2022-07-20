import { faPowerOff, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import { RootRouter } from '../../../../../../configs/router.config';
import InputTdTable from './InputTdTable';

function ProductTable(props: any) {
    const { listProduct, handleSelectProduct, handleSelectAllProduct, handleActiveProduct, handleEditTableProduct } =
        props;
    const navigate = useNavigate();
    const [selectAllProduct, setSelectAllProduct] = useState(false);

    const formatDate = (date: number) => {
        const newDate = new Date(date * 1000);
        return moment(newDate).format('lll');
    };

    useEffect(() => {
        handleSelectAllProduct(selectAllProduct);
    }, [selectAllProduct]);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAllProduct}
                                onChange={() => setSelectAllProduct(!selectAllProduct)}
                            />
                        </th>
                        <th></th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>In stock</th>
                        <th>Vendor</th>
                        <th>Arrival Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct.map((item: any) => (
                        <tr key={item.id} className={item.selected ? 'tr-table-selected' : ''}>
                            <th scope="row">
                                <input
                                    type="checkbox"
                                    checked={item.selected}
                                    onChange={() => handleSelectProduct(item.id)}
                                />
                            </th>
                            <td>
                                <FontAwesomeIcon
                                    icon={faPowerOff}
                                    className="icon-active-product"
                                    style={{ color: item.enabled === '1' ? '#72b25b' : '' }}
                                    onClick={() => handleActiveProduct(item.id, item.enabled)}
                                />
                            </td>
                            <td>{item.sku}</td>
                            <td>
                                <span
                                    className="a-td"
                                    onClick={() =>
                                        navigate({
                                            pathname: RootRouter.DETAIL_PRODUCT,
                                            search: `id=${item.id}`,
                                        })
                                    }
                                >
                                    {item.name}
                                </span>
                            </td>

                            <td>{item.category}</td>

                            <InputTdTable
                                contentTd={item.price}
                                id={item.id}
                                name="price"
                                handleEditTableProduct={handleEditTableProduct}
                            />

                            <InputTdTable
                                contentTd={item.amount}
                                id={item.id}
                                name="stock"
                                handleEditTableProduct={handleEditTableProduct}
                            />

                            <td>{item.vendor}</td>
                            <td>{formatDate(item.arrivalDate)}</td>
                            <td>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleSelectProduct(item.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductTable;
