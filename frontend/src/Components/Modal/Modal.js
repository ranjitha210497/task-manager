import React from 'react';
import './Modal.css';

const Modal = props => (
    <div className="modal">
        <header className="modal_header"><h3 style={{fontWeight: "600"}}>{props.title}</h3></header>
        <section className="modal_content">
            {props.children}
        </section>
        <section className="modal_actions">
            {props.canCancel && <button className="create" style={{width: "80px"}} onClick={props.onCancel}>Cancel</button>}
            {props.canConfirm && <button className="create ml-10" style={{width: "80px"}} onClick={props.onConfirm}>{props.confirmText}</button>}
        </section>
    </div>
);

export default Modal;