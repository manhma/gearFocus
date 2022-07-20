import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './style.scss';
import { Checkbox, ListItemText } from '@mui/material';
import { useState } from 'react';

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

export default function MultiSelectPlus(props: any) {
    const { placeholder, dataSelect, paramName, handleChangeFilter } = props;

    const [dataSelected, setDataSelected] = useState<string[]>([]);
    const [dataSelectedId, setdataSelectedId] = useState<string[]>([]);

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setDataSelected(typeof value === 'string' ? value.split(',') : value);
        const valueSelect = value.map((item: any) => item.id);
        setdataSelectedId(valueSelect);
        handleChangeFilter(paramName, valueSelect);
    };

    const renderOption = (options: any): any => {
        const nameListOption = [];
        for (const item in options) {
            nameListOption.push(item);
        }
        return nameListOption.map((item) => {
            return [
                <MenuItem disabled value="">
                    <div className="title-select">{item}</div>
                </MenuItem>,
                options[item].map((element: any) => {
                    return (
                        <MenuItem key={element.id} value={element}>
                            <Checkbox checked={dataSelectedId.indexOf(element.id) > -1} />
                            <ListItemText primary={element.name} />
                        </MenuItem>
                    );
                }),
            ];
        });
    };

    return (
        <FormControl size="small" sx={{ width: 250 }}>
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
