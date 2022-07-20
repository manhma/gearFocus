import React, { useState } from 'react';
import './InputTdTable.scss';

type Props = {
    contentTd: string | number;
    id: string | number;
    name: string;
    handleEditTableProduct: any;
};

function InputTdTable({ contentTd, id, name, handleEditTableProduct }: Props) {
    const [isShowInput, setIsShowInput] = useState(false);
    const [valueInputEdit, setValueInputEdit] = useState<string | number>(contentTd);
    const handleUpdateValue = () => {
        if (valueInputEdit !== contentTd) {
            const editValue = { id, [name]: valueInputEdit };
            handleEditTableProduct(editValue);
        }
        setIsShowInput(false);
    };

    return (
        <td
            className="td-edit"
            onClick={() => {
                setIsShowInput(true);
            }}
            onBlur={() => {
                handleUpdateValue();
            }}
        >
            <div className="input-edit">
                {name === 'price' ? <span>$</span> : null}
                {isShowInput ? (
                    <input
                        autoFocus
                        value={valueInputEdit}
                        onChange={(e) => setValueInputEdit(e.target.value)}
                        className="input-edit"
                    />
                ) : (
                    <span>{valueInputEdit}</span>
                )}
            </div>
        </td>
    );
}

export default InputTdTable;
