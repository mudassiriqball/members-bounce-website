import React, { useEffect, useState } from "react";
import { Row, Col, ModalBody, Modal, Button, Label } from "reactstrap";
import Error from "../Error";
import PhoneInput from "react-phone-input-2";

const ConfirmPlayNowRequestModal = (props) => {
  const { visible, onHide, user, onConfirm } = props;
  const [mobile, setMobile] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    setMobile(user && user.mobile);
    return () => {}
  }, [user]);

  const handlePhoneChange = () => {
    try {
      if (mobile === '') {
        setErr('Required!');
      } else {
        onConfirm(mobile);
        onHide();
      }
    } catch (error) {
      console.log('handlePhoneChange in model err:', error);
    }
  }

  return (
    <Modal isOpen={visible} toggle={onHide} className={props.className}>
      <ModalBody>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <h5 className='p-0 m-0'>Provide your active mobile number</h5>
          <i class='bx bx-window-close text-danger bx-md' onClick={onHide} ></i>
        </div>
        <hr />
        <Row>
          <div className="mb-3">
            <div>
              <Label>{'Mobile'}</Label>
              <span className="text-danger ms-1">&#9733;</span>
            </div>
            <PhoneInput
              country={'gb'}
              name="mobile"
              value={mobile}
              onChange={val => { setMobile(val), setErr('') }}
              inputClass='w-100'
              containerClass={err !== '' ? 'mobile-error-border' : 'mb-3'}
            />
            {err !== '' && <Error>{err}</Error>}
          </div>
        </Row>
        <hr />
        {/* Buttons */}
        <Row>
          <Col>
            <Button color="primary" class="btn btn-primary" onClick={() => { handlePhoneChange(), onHide() }}>Confirm</Button>
          </Col>
          <Col className='justify-content-end d-flex'>
            <Button color="danger" class="btn btn-danger" onClick={onHide}>Cancel</Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default ConfirmPlayNowRequestModal;
