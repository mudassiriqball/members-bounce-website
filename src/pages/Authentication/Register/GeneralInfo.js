import React, { useEffect, useState } from 'react'
// import PhoneInput from 'react-native-phone-number-input';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { urls } from '../../../helpers';
import AvField from 'availity-reactstrap-validation/lib/AvField';
// import DatePicker from 'react-native-datepicker';
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
    setPhone, phone, country, setCountry
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
      // toastRef && toastRef.current && toastRef.current.show('Fix error first !', CONSTS.TOAST_MEDIUM_DURATION, () => {});
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
        // toastRef && toastRef.current && toastRef.current.show('Verification code has been sended to your email.Please check your email', CONSTS.TOAST_MEDIUM_DURATION, () => {});
      }).catch(err => {
        setIsCodeSended(false);
        setIsLoading(false);
        if (err.response.status === 409) {
          setFieldError('email', 'This email already exist.')
          // toastRef && toastRef.current && toastRef.current.show('This email already exists', CONSTS.TOAST_MEDIUM_DURATION, () => {});
        } else if (err.response.status === 400) {
          // toastRef && toastRef.current && toastRef.current.show('This email doesn\'t exist, Or something went wrong', CONSTS.TOAST_MEDIUM_DURATION, () => {});
        } else {
          // toastRef && toastRef.current && toastRef.current.show('Something went wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {});
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
      <div className="mb-3">
        <AvField
          name="firstName"
          label="First Name"
          className="form-control"
          placeholder="Enter First Name"
          type="text"
          errorMessage={(touched.firstName && errors.firstName) ? errors.firstName : ''}
          onChange={(e, val) => setFieldValue('firstName', val)}
          value={values.firstName}
          required
        />
      </div>
      {/* Last Name */}
      <div className="mb-3">
        <AvField
          name="lastName"
          label="Last Name"
          className="form-control"
          placeholder="Enter Last Name"
          type="text"
          errorMessage={(touched.lastName && errors.lastName) ? errors.lastName : ''}
          onChange={(e, val) => setFieldValue('lastName', val)}
          value={values.lastName}
          required
        />
      </div>
      {/* Mobile */}
      <div>
        <Label>{'Mobile'}</Label>
      </div>
      <PhoneInput
        country={country}
        value={phone}
        onChange={phone => handlePhoneChange(phone)}
        inputClass='w-100'
        containerClass={(errors.mobile && touched.mobile) ? 'mobile-error-border' : 'mb-3'}
      />
      {(errors.mobile && touched.mobile) && <Error>{errors.mobile}</Error>}

      {/* DOB */}
      <div>
        <Label >{'Date of Birth'}</Label>
        <Label >{'*'}</Label>
      </div>
      <div>
        {/* <DatePicker
          style={[styles.datePickerStyle,
          {
            borderColor: (errors.dob && touched.dob) ?
              colors.ERROR : colors.BORDER,
            borderWidth: 1,
          },
          (errors.dob && touched.dob) && { marginBottom: 0 }
          ]}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 10,
            },
            dateInput: {
              borderColor: 'transparent',
              height: 57,
              alignItems: 'center',
              justifyContent: 'center'
            },
          }}
          onDateChange={onChange}
        /> */}
      </div>
      {/* {(errors.dob && touched.dob) &&
        <div style={{ marginBottom: 15 }}>
          {renderError(errors.dob)}
        </div>
      } */}
      <div className="mb-3">
        <AvField
          name="email"
          label="EMail"
          className="form-control"
          placeholder="Enter EMail"
          type="text"
          errorMessage={(touched.email && errors.email) ? errors.email : ''}
          onChange={(e, val) => {
            setFieldValue('email', val);
            values.email !== prevEmail && (setIsCodeSended(false), setIsCodeVerified(false));
          }}
          value={values.email}
          required
        />
      </div>
      {/* Code Input */}
      {!isCodeVerified &&
        <React.Fragment>
          {isCodeSended &&
            <React.Fragment>
              <React.Fragment>
                <div className="mb-3">
                  <OtpInput
                    value={code}
                    onChange={(val) => { setCode(val), setCodeErr('') }}
                    numInputs={6}
                    separator={<span>-</span>}
                    containerStyle='d-flex w-100 otp-container'
                    inputStyle='d-flex w-100 otp-input'
                    disabled={isCodeVerified}
                  />
                </div>
                {codeErr !== '' && <Error>{codeErr}</Error>}
              </React.Fragment>
              {/* <CodeField
                ref={codeFieldRef}
                value={code}
                onChangeText={(val) => { setCode(val), setCodeErr('') }}
                cellCount={6}
                rootStyle={[styles.codeFieldRoot(colors), codeErr && { borderColor: colors.ERROR, borderWidth: 2 }]}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Label
                    key={index}
                    style={[styles.cell(colors), isFocused && styles.focusCell(colors)]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Label>
                )}
              />
              {codeErr !== '' && renderError(codeErr)} */}
            </React.Fragment>
          }
          <div>
            {isCodeSended ?
              <Row>
                <Col>
                  <Button
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
                </Col>
                <Col>
                  <Button
                    loading={isVerifyLoading}
                    onClick={() => handleVerifyCode()}
                  >Verify</Button>
                </Col>
              </Row>
              :
              <Row>
                <Col></Col>
                <Col>
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