import Button from '../../../components/Common/Button';
import React, { useState } from 'react';
import { Label } from 'reactstrap';

export default function RegisterReview(props) {
  const { values, handleRegister, isSubmitting } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* <Input
        mandatory
        colors={colors}
        label={'Signup as'}
        error={''}
        editable={false}
        value={values.role === 'customer' ? 'Customer' : values.role === 'courseManager' ? 'Course Manager' : ''}
      />
      <Input
        mandatory
        colors={colors}
        label={'Email'}
        error={''}
        editable={false}
        value={values.email}
      />
      <Input
        mandatory
        colors={colors}
        label={'First Name'}
        editable={false}
        error={''}
        value={values.firstName}
      />
      <Input
        mandatory
        colors={colors}
        label={'Last Name'}
        editable={false}
        error={''}
        value={values.lastName}
      />
      <Input
        mandatory
        colors={colors}
        label={'Date Of Birth'}
        editable={false}
        error={''}
        value={values.dob}
      />
      <Input
        mandatory
        colors={colors}
        label={'Mobile'}
        editable={false}
        error={''}
        value={values.mobile}
      />
      <Input
        colors={colors}
        label={'Industry / Occupation'}
        editable={false}
        error={''}
        value={values.industry}
      />
      {values.postCode !== '' && <Input
        colors={colors}
        label={'Postal Code District'}
        editable={false}
        error={''}
        value={values.postCode}
      />}
      <Input
        mandatory
        colors={colors}
        label={'Home Club'}
        editable={false}
        error={''}
        value={values.homeClub}
      />
      <Input
        mandatory
        colors={colors}
        label={'Course Location'}
        value={values.courseLocation}
        editable={false}
        error={''}
      />
      <Input
        mandatory
        colors={colors}
        label={'CDH ID/World Handicap Index'}
        editable={false}
        error={''}
        value={values.cdhId}
      />
      <Input
        colors={colors}
        mandatory
        label={'Password'}
        value={values.password}
        editable={false}
        error={''}
        secureTextEntry={showPassword ? false : true}
        right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.SEC_MAIN} onClick={() => setShowPassword(!showPassword)} />}
      /> */}
      <div style={{ height: 30 }} />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        onClick={() => handleRegister()}
      >Register</Button>
    </div>
  )
}