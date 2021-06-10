import React, { useEffect, useRef, useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';

import GeneralInfo from './GeneralInfo';
import PersonalInfo from './PersonalInfo';
import RegisterReview from './RegisterReview';
import getMembersOnlyClubs from '../../../hooks/getMembersOnlyClubs';
import { verifyPostCode } from '../../../helpers/RestService';
import { urls } from '../../../helpers';
import Button from '../../../components/Common/Button';
import { MetaTags } from 'react-meta-tags';
import { Link } from 'react-router-dom';
// import images
import profileImg from "../../../assets/images/profile-img.png"
import logoImg from "../../../assets/images/_logo.jpeg"
import routeNames from "../../../routes/routeNames";
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import getGolfCoursesRegAndProfile from 'hooks/getGolfCoursesRegAndProfile';
import { convertToDOBFormate, getMaxDateForDob } from 'helpers/dateUtility';
import { ErrorAlert, SuccessAlert } from 'components/Common';
import golfersType from 'helpers/golfersType';


const schema = yup.object({
  email: yup.string().email('Invalid email')
    .required('Required*')
    .max(100, 'Can\'t be grater than 100 characters'),
  firstName: yup.string().required('Required*')
    .min(1, 'Enter 1-30 characters')
    .max(30, 'Enter 1-30 characters'),
  lastName: yup.string().required('Required*')
    .min(1, 'Enter 1-30 characters')
    .max(30, 'Enter 5-30 characters'),
  dob: yup.string().required('Required*'),
  mobile: yup.string().required('Required*'),
  golferType: yup.string(),

  homeClub: yup.string(),
  isMember: yup.bool(),
  courseLocation: yup.string(),
  cdhId: yup.string(),
  postCode: yup.string(),
  industry: yup.string(),

  password: yup.string().required('Required*')
    .min(8, 'Enter 8-20 characters')
    .max(20, 'Enter 8-20 characters'),
  confirm_password: yup.string().required('Required*').when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("password")],
      'Password must match'
    )
  }),
  termsOfUse: yup.bool().oneOf([true], 'Required*'),
  privacy: yup.bool().oneOf([true], 'Required*'),
  role: yup.string(),
});

export default function Register(props) {
  const { GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER, GOLF_COURSES_LIST_REG_PROFILE } = getGolfCoursesRegAndProfile();
  const { MEMBERS_ONLY_CLUBS } = getMembersOnlyClubs();
  const [step, setSteps] = useState(1);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [country, setCountry] = useState('GB');
  const maxDate = getMaxDateForDob();

  // Phone
  const phoneRef = useRef();
  const [phone, setPhone] = useState("");

  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);

  const handleStepForeword = async (values, errors, setFieldError, touched, setTouched, setFieldValue) => {
    if (step === 1) {
      setTouched({
        ['email']: true, ['firstName']: true, ['lastName']: true, ['mobile']: true, ['dob']: true,
      });
      if (values.phone) {
        setFieldError('mobile', 'Invalid Phone!');
        setErrorAlert(true);
        setErrMsg('Fix error first!');
      } else if (!errors.email && !errors.firstName && !errors.lastName && !errors.mobile && !errors.dob) {
        setSteps(2);
      } else {
        setErrorAlert(true);
        setErrMsg('Fix error first!');
      }
    } else if (step === 2) {

      // Setting Golfer Type
      if (values.role === 'courseManager') {  // Course Manager
        setFieldValue('golferType', golfersType.COURSE_MANAGER);
      } else if (values.cdhId !== '' && values.homeClub === '') { // Nomad Golfer
        setFieldValue('golferType', golfersType.NOMAD);
      } else if (values.cdhId === '' && values.homeClub === '') { // Individual/Casual Golfer
        setFieldValue('golferType', golfersType.INDIVIDUAL);
      } else {
        try {
          const list = MEMBERS_ONLY_CLUBS && MEMBERS_ONLY_CLUBS.filter(item => {
            return item.course.trim() === values.homeClub.trim()
          });
          setFieldValue('golferType', list.length > 0 ? golfersType.MEMBERS_ONLY : '');

          const _list = GOLF_COURSES_LIST_REG_PROFILE && GOLF_COURSES_LIST_REG_PROFILE.filter(item => {
            return item.course.trim() === values.homeClub.trim()
          });
          setFieldValue('golferType', _list.length > 0 ? golfersType.PRIVATE_CLUB : '');
        } catch (error) {
        }
      }

      const isPostCodeValid = await verifyPostCode(values.postCode);
      setTouched({
        ['homeClub']: true, ['courseLocation']: true, ['cdhId']: true, ['postCode']: true,
        ['password']: true, ['confirm_password']: true, ['termsOfUse']: true, ['privacy']: true
      });
      if ((values.isMember && (values.courseLocation === '' || values.cdhId === '')) ||
        values.termsOfUse === false || values.privacy === false ||
        (values.postCode !== '' && !isPostCodeValid)) {
        if (values.isMember && values.courseLocation === '')
          setFieldError('courseLocation', 'Required*');
        else
          setFieldError('courseLocation', '');
        if (values.isMember && values.cdhId === '')
          setFieldError('cdhId', 'Required*');
        else
          setFieldError('cdhId', '');
        if (values.postCode === '') {
          setFieldError('postCode', 'Required*');
        } else if (!isPostCodeValid) {
          setFieldError('postCode', 'Invalid Postal Code!');
        }
        setErrorAlert(true);
        setErrMsg('Fix error first!');
      } else if (!errors.homeClub && !errors.courseLocation && !errors.cdhId && !errors.password && !errors.confirm_password && !errors.postCode) {
        setSteps(3);
      } else {
        setErrorAlert(true);
        setErrMsg('Fix error first!');
      }
    }
  }

  return (
    <div>
      <MetaTags>
        <title>Register | Members Bounce</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      {errorAlert &&
        <ErrorAlert msg={errMsg} onClick={() => setErrorAlert(false)} />
      }
      {successAlert &&
        <SuccessAlert msg={successMsg} onClick={() => setSuccessAlert(false)} />
      }
      <div className='account-pages my-5 pt-sm-5'>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      {/* <img src={profileImg} alt="" className="img-fluid" /> */}
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <Formik
                    initialValues={{
                      mobile: '',
                      firstName: '',
                      lastName: '',
                      dob: '',
                      email: '',
                      golferType: '',

                      password: '',
                      confirm_password: '',
                      termsOfUse: false,
                      privacy: false,

                      homeClub: '',
                      isMember: true,
                      courseLocation: '',
                      cdhId: '',
                      postCode: '',
                      industry: '',
                      role: 'customer'
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                      values.email = values.email.toLowerCase().trim();
                      values.dob = convertToDOBFormate(values.dob);
                      await axios({
                        method: 'POST',
                        url: urls.REGISTER,
                        data: values
                      }).then(res => {
                        // toastRef && toastRef.current && toastRef.current.show('Congragulations your account created successfully!', CONSTS.TOAST_MEDIUM_DURATION, () => {
                        actions.setSubmitting(false)
                        // navigation.navigate('Login');
                      }).catch(err => {
                        console.log('register err:', err);
                        // toastRef && toastRef.current && toastRef.current.show('something went wrong, Please try again later!', CONSTS.TOAST_MEDIUM_DURATION, () => {
                        actions.setSubmitting(false)
                      }).finally(() => {
                      })
                    }}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleSubmit,
                      handleChange,
                      setSubmitting,
                      setFieldValue,
                      setFieldError,
                      handleBlur,
                      setTouched,
                    }) => {
                      return (
                        <div>
                          {/* <Avatar.Image size={120} style={{ alignSelf: 'center', marginBottom: 30 }} source={require('../../../../assets/icon.png')} /> */}
                          {/* Steps Container */}
                          <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col className='step-container' >
                              <div>
                                {step > 1 ?
                                  <Label className={'text-white bg-primary circle'}>
                                    <i class='bx bx-check bx-md'></i>
                                  </Label>
                                  :
                                  <Label className={step === 1 ? 'text-white bg-primary circle' : 'circle'}>{1}</Label>
                                }
                              </div>
                              <Label>General</Label>
                            </Col>
                            <Col></Col>
                            <Col className='step-container'>
                              <div>
                                {step > 2 ?
                                  <Label className={'text-white bg-primary circle'}>
                                    <i class='bx bx-check bx-md'></i>
                                  </Label>
                                  :
                                  <Label className={step === 2 ? 'text-white bg-primary circle' : 'circle'}>{2}</Label>
                                }
                              </div>
                              <Label>Personel</Label>
                            </Col>
                            <Col></Col>
                            <Col className='step-container'>
                              <div>
                                {step > 3 ?
                                  <Label className={'text-white bg-primary circle'}>
                                    <i class='bx bx-check bx-md'></i>
                                  </Label>
                                  :
                                  <Label className={step === 3 ? 'text-white bg-primary circle' : 'circle'}>{3}</Label>
                                }
                              </div>
                              <Label>Review</Label>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                          </Row>
                          <hr />
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={(e, v) => {}}
                          >
                            <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                              {step === 1 ?
                                <React.Fragment>
                                  <GeneralInfo
                                    maxDate={maxDate}
                                    values={values}
                                    handleChange={handleChange}
                                    touched={touched}
                                    setFieldValue={setFieldValue}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    setFieldError={setFieldError}
                                    isCodeSended={isCodeSended}
                                    setIsCodeSended={setIsCodeSended}
                                    isCodeVerified={isCodeVerified}
                                    setIsCodeVerified={setIsCodeVerified}
                                    phoneRef={phoneRef}
                                    phone={phone}
                                    setPhone={setPhone}
                                    country={country}
                                    setCountry={setCountry}
                                    setErrorAlert={setErrorAlert}
                                    setErrMsg={setErrMsg}
                                    setSuccessAlert={setSuccessAlert}
                                    setSuccessMsg={setSuccessMsg}
                                  />
                                  <div className='d-flex justify-content-center align-items-center'>
                                    <Label>Already have an account ? <Link to="/login">Login</Link></Label>
                                  </div>
                                </React.Fragment>
                                :
                                step === 2 ?
                                  <React.Fragment>
                                    <PersonalInfo
                                      values={values}
                                      handleChange={handleChange}
                                      touched={touched}
                                      handleBlur={handleBlur}
                                      setFieldValue={setFieldValue}
                                      errors={errors}
                                      setFieldError={setFieldError}
                                      isCodeSended={isCodeSended}
                                      setIsCodeSended={setIsCodeSended}
                                      isCodeVerified={isCodeVerified}
                                      setIsCodeVerified={setIsCodeVerified}
                                      setErrorAlert={setErrorAlert}
                                      setErrMsg={setErrMsg}
                                      setSuccessAlert={setSuccessAlert}
                                      {...props}
                                    />
                                  </React.Fragment>
                                  :
                                  <React.Fragment>
                                    <RegisterReview
                                      values={values}
                                      handleRegister={handleSubmit}
                                      isSubmitting={isSubmitting}
                                    />
                                  </React.Fragment>
                              }
                            </div>
                          </AvForm>
                          <hr />
                          <Row>
                            <Col className='d-flex justify-content-center'>
                              {step > 1 &&
                                <Button
                                  onClick={() => setSteps(step - 1)}
                                  disabled={isSubmitting}
                                >Back</Button>
                              }
                            </Col>
                            <Col className='d-flex justify-content-end'>
                              {step < 3 &&
                                <Button
                                  color='danger'
                                  // disabled={!isCodeVerified || isSubmitting}
                                  onClick={() => handleStepForeword(values, errors, setFieldError, touched, setTouched, setFieldValue)}
                                >Next</Button>
                              }
                              {step === 3 &&
                                <Button
                                  color='success'
                                  disabled={!isCodeVerified || isSubmitting}
                                  onClick={() => handleStepForeword(values, errors, setFieldError, touched, setTouched, setFieldValue)}
                                >Register</Button>
                              }
                            </Col>
                          </Row>
                        </div>
                      )
                    }}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}