import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { App } from '@capacitor/app';

const confirm = ({ show, handleClose }) => {

    const exitApp = () => {
        App.exitApp();
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className="confirmbox" centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <div className='d-flex flex-column centerDiv'>

                <h3 className='text-center'>Are you Sure to exit ?</h3>

                <div className='container d-flex justify-content-around align-items-center mt-3 '>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button onClick={exitApp} style={{background : '#f15733', border:'none'}}>
                        Yes
                    </Button>

                </div>
                </div>

            </Modal>
        </>
    )
}

export default confirm