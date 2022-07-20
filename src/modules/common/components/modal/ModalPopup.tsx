import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

type Props = {
    idModal: boolean;
    modalTile: string;
    modalContent: string;
    handleOK: () => void;
};

function ModalPopup({ idModal, modalTile, modalContent, handleOK }: Props) {
    const [modal, setModal] = useState(idModal);

    const toggle = () => setModal(!modal);
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{modalTile}</ModalHeader>
                <ModalBody>{modalContent}</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            toggle();
                            handleOK();
                        }}
                    >
                        OK
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalPopup;
