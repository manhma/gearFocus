import { Alert } from "reactstrap";

interface IFormErrorMessage {
  message: string;
}

const FormErrorMessage = ({ message }: IFormErrorMessage) => {
  if (!message) {
    return null;
  }

  return (
    <Alert color="danger" className="mt-1">
      {message}
    </Alert>
  );
};

export default FormErrorMessage;
