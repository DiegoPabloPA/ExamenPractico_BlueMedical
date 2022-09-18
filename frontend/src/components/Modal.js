import React from 'react';
import { Modal } from 'react-bootstrap'



const Modals = (props) => {
    return (
        <>

            <Modal backdrop={props.backdrop ? props.backdrop : true} title={props.title} show={props.show} fullscreen={false} onHide={props.close} size={props.size} centered={props.centered}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {props.children}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Modals;
