import { Input } from 'reactstrap';

function InputSelect(props: any) {
    const { placeholder, dataSelect, paramName, setFilter } = props;
    return (
        <Input
            type="select"
            className=" filter-input"
            onChange={(e) =>
                setFilter((prev: any) => {
                    if (paramName === 'status') {
                        return {
                            ...prev,
                            [paramName]: [e.target.value],
                        };
                    }
                    return {
                        ...prev,
                        [paramName]: e.target.value,
                    };
                })
            }
        >
            {placeholder ? <option value="">{placeholder}</option> : <></>}
            {dataSelect.map((item: any, index: number) => (
                <option key={index} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Input>
    );
}

export default InputSelect;
