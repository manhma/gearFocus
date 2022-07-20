import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { getRequest } from '../../../../../services/apiServices';
import './Shipping.scss';

type Props = {
    handleAddShippingData: (id: number | string, price: number | string) => void;
    handleRemoveShippingData: (id: number | string) => void;
    handleChangeShippingData: (id: number | string, price: number | string) => void;
};

function Shipping({ handleAddShippingData, handleRemoveShippingData, handleChangeShippingData }: Props) {
    const [listCountry, setListCountry] = useState<any>([]);
    const [listShipLocation, setListShipLocation] = useState<any>([]);
    const [countrySelect, setCountrySelect] = useState<any>();

    const handleAddCountry = (id: number | string) => {
        const newListShipLocation = listCountry.filter((item: any) => item.id === id);
        setListShipLocation((prev: any) => [...prev, ...newListShipLocation]);
        const newListCountry = listCountry.filter((item: any) => item.id !== id);
        setListCountry(newListCountry);
        setCountrySelect('');

        //handledataShipping
        if (id) {
            handleAddShippingData(id, '');
        }
    };
    const handleRemoveCountry = (id: number | string) => {
        const newListShipLocation = listShipLocation.filter((item: any) => item.id !== id);
        setListShipLocation(newListShipLocation);
        const newListCountry = listShipLocation.filter((item: any) => item.id === id);
        setListCountry((prev: any) => [...prev, ...newListCountry]);

        //handleRemoveShipping
        handleRemoveShippingData(id);
    };

    const handleChangePrice = (e: any, id: number | string) => {
        const newPrice = e.target.value.toString();
        handleChangeShippingData(id, newPrice);
    };

    useEffect(() => {
        const getCountry = async () => {
            const res = await getRequest('apiAdmin/shipping/list');

            setListCountry(res.body.data);
        };
        getCountry();
    }, []);
    return (
        <div>
            <FormGroup row>
                <Label sm={4}>Continental U.S. *</Label>
                <Col sm={8} className="tax-exempt">
                    <Input
                        type="number"
                        placeholder="0.00"
                        className="filter-input"
                        onChange={(e: any) => handleChangePrice(e, '1')}
                    />
                    <FontAwesomeIcon icon={faDollarSign} />
                </Col>
            </FormGroup>
            {listShipLocation.map((item: any) => {
                return (
                    <FormGroup row key={item.id}>
                        <Label sm={4}>{item.name}</Label>
                        <Col sm={8} className="tax-exempt">
                            <Input
                                type="number"
                                className="filter-input"
                                onChange={(e) => {
                                    handleChangePrice(e, item.id);
                                }}
                            />
                            <FontAwesomeIcon icon={faDollarSign} />
                            <div className="add-ship-location" onClick={() => handleRemoveCountry(item.id)}>
                                Remove
                            </div>
                        </Col>
                    </FormGroup>
                );
            })}
            <FormGroup row>
                <Label sm={4}></Label>
                <Col sm={8} className="tax-exempt">
                    <Input
                        type="select"
                        className="filter-input"
                        value={countrySelect}
                        onChange={(e) => setCountrySelect(e.target.value)}
                    >
                        {listCountry.map((item: any) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Input>
                    <div className="add-ship-location" onClick={() => handleAddCountry(countrySelect)}>
                        Add Shipping Location
                    </div>
                </Col>
            </FormGroup>
        </div>
    );
}

export default Shipping;
