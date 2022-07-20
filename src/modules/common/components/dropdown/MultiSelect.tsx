import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import './style.scss';
import { Box, Checkbox, ListItemText } from '@mui/material';
import { memo, useState } from 'react';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '200px',
        },
    },
};

function MultiSelect(props: any) {
    const { placeholder, dataSelect, paramName, setValue, defautValueId } = props;
    let defautValue: any = [];
    defautValueId?.map((item: any) => {
        defautValue = [...defautValue, ...dataSelect.filter((element: any) => element.id === item)];
    });
    const [dataSelected, setDataSelected] = useState<string[]>(defautValue);
    const [dataSelectedId, setdataSelectedId] = useState<string[]>(defautValueId || []);
    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setDataSelected(typeof value === 'string' ? value.split(',') : value);
        const valueSelect = value.map((item: any) => item.id);
        setdataSelectedId(valueSelect);
        setValue((prev: any) => ({
            ...prev,
            [paramName]: valueSelect,
        }));
    };

    const renderOption = (options: any): any => {
        return options?.map((item: any) => (
            <MenuItem key={item.id} value={item}>
                <Checkbox checked={dataSelectedId.indexOf(item.id) > -1} />
                <ListItemText primary={item.name} />
            </MenuItem>
        ));
    };

    return (
        <FormControl size="small" sx={{ width: '100%' }}>
            <Select
                multiple
                displayEmpty
                value={dataSelected}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <div>{placeholder}</div>;
                    }
                    return selected.map((item: any) => item.name).join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {renderOption(dataSelect)}
            </Select>
        </FormControl>
    );
}

export default memo(MultiSelect);
