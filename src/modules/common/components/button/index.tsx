import { Button as ButtonBootStrap, ButtonProps, Spinner } from 'reactstrap';

interface IButton extends ButtonProps {
    isLoading?: boolean;
    title: string;
}

const Button = (props: IButton) => {
    const { isLoading, title, ...inputProps } = props;

    return (
        <ButtonBootStrap {...inputProps} block>
            {isLoading && <Spinner animation="border" size="sm" color="white" />}
            {title}
        </ButtonBootStrap>
    );
};

export default Button;
