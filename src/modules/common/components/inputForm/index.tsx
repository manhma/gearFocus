import { memo } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import './styles.scss';

interface IErrorMessage {
    meta: any;
}

const InputForm = (props: any) => {
    const { label, field, meta, data, className } = props;
    return (
        <FormGroup row>
            {label && <Label sm={4}>{label}</Label>}
            <Col sm={label ? 8 : 0}>
                <Input {...field} {...props} className={className}>
                    {data?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Input>
            </Col>
            <ErrorMessage meta={meta} />
        </FormGroup>
    );
};

const ErrorMessage = ({ meta }: IErrorMessage) => {
    return meta.touched && meta.error && <div className="error-validate">{meta.error}</div>;
};

export default memo(InputForm);
