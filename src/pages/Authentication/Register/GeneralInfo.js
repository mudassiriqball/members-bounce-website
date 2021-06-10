import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { urls } from 'helpers';
import CustomAvField from '../../../components/Common/CustomAvField';
import { Col, Label, Row } from 'reactstrap';
import Button from '../../../components/Common/Button';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Error from '../../../components/Common/Error';
import OtpInput from 'react-otp-input';

export default function GeneralInfo(props) {
  const {
    values, handleChange, errors, setFieldError, touched, handleBlur, setFieldValue,
    isCodeSended, setIsCodeSended, phoneRef,
    isCodeVerified, setIsCodeVerified,
    setPhone, phone, country, setCountry, maxDate, setErrorAlert, setErrMsg, setSuccessAlert, setSuccessMsg
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [code, setCode] = useState('');
  const [responseCode, setResponseCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [date, setDate] = useState('01-01-1990');

  // Timer
  const [timer, setTimer] = useState(59);
  const [canResendCode, setCanResendCode] = useState(false);
  useEffect(() => {
    let interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        setCanResendCode(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // PhoneInput
  const handlePhoneChange = (val) => {
    setFieldValue('mobile', val);
  }

  // Send Code
  const handleSendCode = async () => {
    if (errors.email) {
      setErrorAlert(true);
      setErrMsg('Fix error first!');
    } else {
      setIsLoading(true);
      await axios({
        method: 'GET',
        url: urls.VERIFY_USER_NAME + values.email.trim().toLowerCase(),
      }).then(res => {
        setTimer(59);
        setCanResendCode(false);
        setIsCodeSended(true);
        setIsLoading(false);
        setResponseCode(res.data.email_code);
        setSuccessAlert(true);
        setSuccessMsg('Verification code sended to your email.');
      }).catch(err => {
        setIsCodeSended(false);
        setIsLoading(false);
        if (err.response && err.response.status === 409) {
          setFieldError('email', 'This email already exist.')
          setErrorAlert(true);
          setErrMsg('This email already exists');
        } else if (err.response && err.response.status === 400) {
          setErrorAlert(true);
          setErrMsg('This email doesn\'t exist, Or something went wrong');
        } else {
          setErrorAlert(true);
          setErrMsg('Something went wrong, Please try again later!');
        }
      })
    }
  }

  // Verify Code
  const handleVerifyCode = () => {
    if (code === '' || code.length !== 6) {
      if (values.email === '')
        setFieldError('email', 'Required*')
      if (code === '')
        setCodeErr('Required*')
      else if (code.length !== 6)
        setCodeErr('Enter 6 digit code')
    } else {
      setIsVerifyLoading(true);
      if (code == responseCode) {
        setIsCodeVerified(true);
        setPrevEmail(values.email);
      } else {
        setCodeErr('Invalid Code!');
      }
    }
    setIsVerifyLoading(false);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFieldValue('dob', event);
  };

  return (
    <div>
      {/* First Name */}
      <CustomAvField
        name="firstName"
        label="First Name"
        className="form-control"
        placeholder="Enter First Name"
        type="text"
        onChange={(e, val) => setFieldValue('firstName', val)}
        value={values.firstName}
        error={(errors.firstName && touched.firstName) ? errors.firstName : ''}
        onBlur={handleBlur('firstName')}
        mandatory
      />
      {/* Last Name */}
      <CustomAvField
        name="lastName"
        label="Last Name"
        className="form-control"
        placeholder="Enter Last Name"
        type="text"
        onChange={(e, val) => setFieldValue('lastName', val)}
        value={values.lastName}
        onBlur={handleBlur('lastName')}
        error={(errors.lastName && touched.lastName) ? errors.lastName : ''}
        mandatory
      />
      {/* Mobile */}
      <div>
        <Label>{'Mobile'}</Label>
        <span className="text-danger ms-1">&#9733;</span>
      </div>
      <PhoneInput
        country={'gb'}
        name="mobile"
        value={phone}
        onChange={phone => handlePhoneChange(phone)}
        inputClass='w-100'
        containerClass={(errors.mobile && touched.mobile) ? 'mobile-error-border' : 'mb-3'}
      />
      {(errors.mobile && touched.mobile) && <Error>{errors.mobile}</Error>}

      {/* DOB */}
      <CustomAvField
        name="dob"
        label="Date of Birth"
        className="form-control"
        type="date"
        defaultValue={values.dob}
        id="example-date-input"
        placeholder="select date"
        min="01-01-1900"
        max={maxDate}
        error={(errors.dob && touched.dob) ? errors.dob : ''}
        onChange={(e, val) => setFieldValue('dob', val)}
        value={values.dob}
        mandatory
      />
      <CustomAvField
        name="email"
        label="Email"
        className="form-control"
        placeholder="Enter Email"
        type="text"
        onChange={(e, val) => {
          setFieldValue('email', val);
          values.email !== prevEmail && (setIsCodeSended(false), setIsCodeVerified(false));
        }}
        error={(errors.email && touched.email) ? errors.email : ''}
        value={values.email}
        mandatory
      />
      {/* Code Input */}
      {!isCodeVerified &&
        <React.Fragment>
          {isCodeSended &&
            <>
              <div className="mb-3">
                <Label>{'Verification Code'}</Label>
                <span className="text-danger ms-1">&#9733;</span>
                <OtpInput
                  value={code}
                  onChange={(val) => { setCode(val), setCodeErr('') }}
                  numInputs={6}
                  separator={<span>-</span>}
                  containerStyle={codeErr === '' ? 'd-flex w-100 otp-container' : 'd-flex w-100 otp-container'}
                  inputStyle='d-flex w-100 otp-input'
                  disabled={isCodeVerified}
                />
                {codeErr !== '' && <Error>{codeErr}</Error>}
              </div>
            </>
          }
          <div>
            {isCodeSended ?
              <div className="row my-4">
                <div className="col d-flex justify-content-start">
                  <Button
                    className="text-center"
                    loading={isLoading}
                    disabled={values.email === '' || isLoading || !canResendCode}
                    color='danger'
                    onClick={() => handleSendCode()}
                  >
                    {'Resend'}
                    {timer > 0 && (
                      <Label>
                        {(timer > 9 ? "00:" : "00:0") + timer}
                      </Label>
                    )}
                  </Button>
                </div>
                <div className="col d-flex justify-content-end">
                  <Button
                    loading={isVerifyLoading}
                    onClick={() => handleVerifyCode()}
                  >Verify</Button>
                </div>
              </div>
              :
              <Row>
                <Col className="text-cente my-3">
                  <Button
                    loading={isLoading}
                    disabled={values.email === '' || isLoading}
                    onClick={() => handleSendCode()}
                  >Send Code</Button>
                </Col>
              </Row>
            }
          </div>
        </React.Fragment>
      }
    </div>
  )
}