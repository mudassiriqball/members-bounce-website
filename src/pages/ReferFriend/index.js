
import React, { useEffect, useState } from "react";
import { Button } from "components/Common";
import CustomAvField from "components/Common/CustomAvField";
import { REGEX } from "helpers";
import { getBearerToken } from "helpers/authentication";
import { MetaTags } from "react-meta-tags";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Container, Label, Row } from "reactstrap";
import { authenticateUser } from "store/actions";
import Swal from "sweetalert2";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import AvForm from "availity-reactstrap-validation/lib/AvForm";

const ReferFriend = (props) => {
  const { user } = props;
  const token = getBearerToken();
  const [isLoading, setIsLoading] = useState(false);
  const [informed, setInformed] = useState(false);
  const [notInformed, setNotInformed] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    informed: '',
  });

  useEffect(() => {
    if (!user) authenticateUser();
  }, []);

  // PhoneInput
  const handleRefer = async () => {
    try {
      if (values.name === '' || values.email === '' || !REGEX.EMAIL.test(values.email) ||
        (informed === false && notInformed === false) || (values.mobile === '')
      ) {
        let nameErr = '';
        let emailErr = '';
        let mobErr = '';
        let informedErr = '';
        if (values.name === '') {
          nameErr = 'Required*';
        }
        if (values.email === '') {
          emailErr = 'Required*';
        } else if (!emailReg.test(values.email)) {
          emailErr = 'Invalid Email!';
        }
        if (informed === false && notInformed === false) {
          informedErr = 'Required*'
        }
        if (values.mobile === '') {
          mobErr = 'Required*';
        }
        setErrors({ ...errors, name: nameErr, email: emailErr, mobile: mobErr, informed: informedErr });
        Swal.fire(
          'Error',
          'Fix errors first!',
          'error',
        );
      } else {
        setIsLoading(true);
        await axios({
          method: 'POST',
          url: urls.ADD_REFER_FRIEND + user._id,
          headers: {
            'authorization': token
          },
          data: {
            ...values,
            informed: informed
          }
        }).then(res => {
          setValues({
            name: '',
            email: '',
            mobile: '',
            informed: ''
          });
          setInformed(false);
          setNotInformed(false);
          Swal.fire(
            'Success',
            'Your request processed successfully.',
            'success',
          );
          setIsLoading(false);
        }).catch(err => {
          if (err.response.data.code === 409) {
            Swal.fire(
              'Error',
              'This user already refereed!',
              'error',
            );
          } else {
            Swal.fire(
              'Error',
              'Something went wrong, Please try again later!',
              'error',
            );
          }
          setIsLoading(false);
          console.log('handleRefer err:', err);
        })
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire(
        'Error',
        'Something went wrong, Please try again later!',
        'error',
      );
      console.log('handleRefer err:', error);
    }
  }

  const onToggleSwitch = (e, type) => {
    if (type == 1) {
      if (e) {
        setInformed(true);
        setNotInformed(false);
        setErrors({ ...errors, informed: '' });
      } else {
        setInformed(false);
      }
    } else {
      if (e) {
        setNotInformed(true);
        setInformed(false);
        setErrors({ ...errors, notInformed: '' });
      } else {
        setNotInformed(false);
      }
    }
  }

  return (
    <React.Fragment>
      <div className='page-content'>
        <MetaTags>
          <title>Refer Friend | Members Bounce</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={'Refer Friend'}
          // breadcrumbItem={'All Requests'}
          />
          <Container>
            <Card>
              <CardBody>
                <AvForm
                  className="form-horizontal"
                // onValidSubmit={(e, v) => handleSendCode(e, v)}
                >
                  <Row>
                    <CustomAvField
                      name="friendName"
                      label="Friend Name"
                      className="form-control"
                      placeholder={'Enter Friend Name'}
                      type="text"
                      onChange={(val) => { setValues({ ...values, name: val }), setErrors({ ...errors, name: '' }) }}
                      value={values.name}
                      error={errors.name}
                      mandatory
                    />
                    <CustomAvField
                      name="lastName"
                      label={'Friend Email'}
                      className="form-control"
                      placeholder={'Enter Friend Email'}
                      type="text"
                      onChange={(val) => { setValues({ ...values, email: val }), setErrors({ ...errors, email: '' }) }}
                      value={values.email}
                      error={errors.email}
                      mandatory
                    />

                    <CustomAvField
                      name="lastName"
                      label={'Mobile'}
                      className="form-control"
                      placeholder={'Enter Friend Mobile'}
                      type="number"
                      onChange={(val) => { setValues({ ...values, mobile: val }), setErrors({ ...errors, mobile: '' }) }}
                      value={values.mobile}
                      error={errors.mobile}
                      mandatory
                    />
                    <Button
                      width='100%'
                      loading={isLoading}
                      disabled={isLoading}
                      onClick={() => handleRefer()}
                    >Submit</Button>

                  </Row>
                </AvForm>
              </CardBody>
            </Card>
          </Container>
        </Container>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  const { isLoggedIn, user } = state.User;
  return { isLoggedIn, user }
}
const mapDispatchToProps = {
  authenticateUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferFriend));

