import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from "react"
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap"
import OtpInput from 'react-otp-input';

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import Button from '../../components/Common/Button';
import axios from 'axios';
import { urls } from '../../helpers';
import Error from '../../components/Common/Error';

const ForgetPasswordPage = props => {
  const { history } = props;

  // function handleValidSubmit(event, values) {
  //   props.userForgetPassword(values, props.history)
  // }
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendCodeLoading, setIsSendCodeLoading] = useState(false);
  const [responseCode, setResponseCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passErr, setPassErr] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  // Code Input
  const [code, setCode] = useState('');
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  // Timer
  const [timer, setTimer] = useState(59);
  const [canResendCode, setCanResendCode] = useState(false);

  // ALert
  const [error, setError] = useState('');
  const [forgetSuccessMsg, setForgetSuccessMsg] = useState('');

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

  // Send Code
  const handleSendCode = async () => {
    var emailReg = /^(([^<React.Fragment>()\[\]\\.,;:\s@”]+(\.[^<React.Fragment>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email)) {
      setEmailErr('Invalid email!');
      // toastRef && toastRef.current && toastRef.current.show('Fix error first !', CONSTS.TOAST_MEDIUM_DURATION, () => {});
    } else {
      setIsSendCodeLoading(true);
      await axios({
        method: 'GET',
        url: urls.SEND_CODE + (email.toLowerCase().trim()),
      }).then(res => {
        setTimer(59);
        setIsCodeVerified(false);
        setCanResendCode(false);
        setIsCodeSended(true);
        setIsSendCodeLoading(false);
        setResponseCode(res.data.email_code);
        setForgetSuccessMsg('Verification code has been sended to your email.Please check your email.');
      }).catch(err => {
        setIsSendCodeLoading(false);
        console.log('erre:', err);
        try {
          if (err.response.status === 400) {
            setError('This email doesn\'t exist');
            setEmailErr('This email doesn\'t exist.');
          } else {
            setEmailErr('');
            setError('Something went wrong, Please try again later!');
          }
        } catch (err) {
          setEmailErr('Something went wrong, Please try again later!');
          setError('Something went wrong, Please try again later!');
        }
      })
    }
  }

  // Verify Code
  const handleVerifyCode = () => {
    if (code === '' || code.length !== 6) {
      if (code === '')
        setCodeErr('Required*')
      else if (code.length !== 6)
        setCodeErr('Enter 6 digit code')
    } else {
      setIsVerifyLoading(true);
      if (code == responseCode) {
        setIsCodeVerified(true);
      } else {
        setCodeErr('Invalid Code!');
      }
    }
    setIsVerifyLoading(false);
  }

  // Update Password
  const handleUpdatePassword = async () => {
    if (password === '' || confirmPassword === '' || password !== confirmPassword
      || password.length < 8 || password.length > 20 || confirmPassword.length < 8 || confirmPassword.length > 20) {
      let found = false;
      if (password === '') {
        setPassErr('Required*');
        found = true;
      } else if (password.length < 8 || password.length > 20) {
        found = true;
        setPassErr('Value must be 8-20 characters');
      }
      if (confirmPassword === '') {
        found = true;
        setConfirmPassErr('Required*');
      } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
        found = true;
        setConfirmPassErr('Value must be 8-20 characters');
      }
      if (!found && password !== confirmPassword) {
        setConfirmPassErr('Password shoud match!')
      }
    } else {
      setIsLoading(true);
      axios({
        method: 'PUT',
        url: urls.UPDATE_PASSWORD + (email.toLowerCase().trim()),
        data: { password: password }
      }).then(res => {
        setIsLoading(false);
        setForgetSuccessMsg('Your password updated successfully, Go to login.');
        setIsCodeSended(false);
        setIsCodeVerified(false);
      }).catch(err => {
        console.log('pass err:', err)
        setIsLoading(false);

        // toastRef && toastRef.current && toastRef.current.show('Something went wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => { });
      })
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Forget Password | Members Bounce</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {error ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {error}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    {/* Form */}
                    <AvForm
                      className="form-horizontal"
                    // onValidSubmit={(e, v) => handleSendCode(e, v)}
                    >
                      {/* Send Email */}
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          disabled={isCodeVerified || isCodeSended}
                          type="email"
                          errorMessage={emailErr}
                          onChange={(e, val) => setEmail(val)}
                          value={email}
                          required
                        />
                      </div>

                      {/* Verify Code */}
                      {isCodeSended && !isCodeVerified &&
                        <React.Fragment>
                          <div className="mb-3">
                            <OtpInput
                              value={code}
                              onChange={setCode}
                              numInputs={6}
                              separator={<span>-</span>}
                              containerStyle='d-flex w-100 otp-container'
                              inputStyle='d-flex w-100 otp-input'
                              disabled={isCodeVerified}
                            />
                          </div>
                          {codeErr !== '' && <Error >{codeErr}</Error>}
                        </React.Fragment>
                      }

                      {/* Set Password */}
                      {isCodeVerified &&
                        <React.Fragment>
                          <div className="mb-3 position-relative">
                            <AvField
                              name="password"
                              label="Password"
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="Enter Password"
                              errorMessage={passErr}
                              onChange={(e, val) => setPassword(val)}
                              value={password}
                            />
                            <div style={{ position: 'absolute', top: 37, right: 10 }}>
                              <i onClick={() => setShowPassword(!showPassword)} className={!showPassword ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"} />
                            </div>
                          </div>
                          <div className="mb-3 position-relative">
                            <AvField
                              name="confirmPassword"
                              label="Confirm Password"
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              placeholder="Re-enter Password"
                              errorMessage={confirmPassErr}
                              onChange={(e, val) => setConfirmPassword(val)}
                              value={confirmPassword}
                            />
                            <div style={{ position: 'absolute', top: 37, right: 10 }}>
                              <i onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={!showConfirmPassword ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"} />
                            </div>
                          </div>
                        </React.Fragment>
                      }

                      {/* Buttons */}
                      <Row className="mb-3">
                        <Col className="text-end">
                          {!isCodeVerified ?
                            isCodeSended ?
                              <div className='d-flex justify-content-between'>
                                <Button block
                                  loading={isSendCodeLoading}
                                  disabled={isSendCodeLoading || !canResendCode}
                                  onClick={() => handleSendCode()}
                                >
                                  {timer > 0 && (
                                    (timer > 9 ? "00:" : "00:0") + timer
                                  )}
                                </Button>
                                <Button block
                                  loading={isVerifyLoading}
                                  disabled={isVerifyLoading}
                                  onClick={() => handleVerifyCode()}
                                >
                                  Verify Code
                                </Button>
                              </div>
                              :
                              <Button block
                                loading={isSendCodeLoading}
                                disabled={isSendCodeLoading}
                                onClick={() => handleSendCode()}
                              >
                                Send Code
                              </Button>
                            :
                            <Button block
                              loading={isLoading}
                              disabled={isLoading}
                              onClick={() => handleUpdatePassword()}
                            >
                              Reset Password
                            </Button>
                          }
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Members Bounce
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func
}

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
)
