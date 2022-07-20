import { Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './InputAutocomplate.scss';

function InputAutocomplate(props: any) {
    const { data, setValues, paramName, field } = props;

    const defaultProps = {
        options: data,
        getOptionLabel: (option: any) => option.name,
    };

    return (
        <div>
            <Autocomplete
                {...defaultProps}
                id="combo-box-demo"
                options={data}
                sx={{ width: 300 }}
                onChange={(e, value: any) => {
                    console.log('value: ', value);
                    setValues((prev: any) => ({ ...prev, [paramName]: value.id }));
                }}
                renderInput={(params) => {
                    return (
                        <div ref={params.InputProps.ref}>
                            <input type="text" {...params.inputProps} className="filter-input input-autocomplete " />
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default InputAutocomplate;
