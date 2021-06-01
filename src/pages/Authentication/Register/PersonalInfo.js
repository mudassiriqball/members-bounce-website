import AvField from 'availity-reactstrap-validation/lib/AvField';
import Error from 'components/Common/Error';
import React, { useState } from 'react'
import { Label } from 'reactstrap';

export default function PersonalInfo(props) {

  const {
    GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER, COURSES_LOCATION_LIST,
    values, handleChange, errors, setFieldError, touched, handleBlur, setFieldValue,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Switch
  const [isCourseManager, setIsCourseManager] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isTermsOfUse, setIsTermsOfUse] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);

  const onToggleCourseManagerSwitch = (e) => {
    setIsCourseManager(e);
    if (e) {
      setFieldValue('role', 'courseManager');
    } else {
      setFieldValue('role', 'customer');
    }
  }
  const onToggleMemberSwitch = (e) => {
    setIsMember(e);
    if (e) {
      setFieldValue('isMember', false);
    } else {
      setFieldValue('isMember', true);
    }
  }
  const onToggleTermsOfUseSwitch = (e) => {
    setIsTermsOfUse(e);
    setFieldValue('termsOfUse', e);
  }
  const onTogglePrivacySwitch = (e) => {
    setIsPrivacy(e);
    setFieldValue('privacy', e);
  }

  return (
    <div>
      {/* Signup As*/}
      <div>
        <Label>Signup as Course Manager?</Label>
        {/* <Switch value={isCourseManager} color={colors.SEC_MAIN} onValueChange={(e) => onToggleCourseManagerSwitch(e)} /> */}
      </div>


      {/* Not a member */}
      <div>
        <Label>Not a member?</Label>
        {/* <Switch value={isMember} color={colors.SEC_MAIN} onValueChange={(e) => onToggleMemberSwitch(e)} /> */}
      </div>

      {values.isMember &&
        <>
          {/* Home Club */}
          {/* <CustomPicker
            colors={colors}
            title={'Home Club'}
            selectedValue={values.homeClub}
            onValueChange={(value, id, index) =>
              setFieldValue('homeClub', value)
            }
            padding={-4}
            error={errors.homeClub ? errors.homeClub && touched.homeClub ? errors.homeClub : '' : ''}
            list={GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER}
          /> */}
          {/* Course Location */}
          {/* <CustomPicker
            mandatory
            colors={colors}
            title={'Course Location'}
            selectedValue={values.courseLocation}
            onValueChange={(value, id, index) =>
              setFieldValue('courseLocation', value)
            }
            padding={-4}
            error={errors.courseLocation ? (errors.courseLocation && touched.courseLocation) ? errors.courseLocation : '' : ''}
            list={COURSES_LOCATION_LIST}
          /> */}
          {/* CDH ID / World Handicap Index*/}
          <div className="mb-3">
            <AvField
              name="cdhId"
              label="CDH ID/World Handicap Index"
              className="form-control"
              placeholder={'Enter CDH ID / World Handicap Index'}
              type="text"
              errorMessage={(touched.cdhId && errors.cdhId) ? errors.cdhId : ''}
              onChange={(e, val) => { setFieldValue('cdhId', val) }}
              value={values.cdhId}
              required
            />
          </div>
        </>
      }
      {/* Postal Code District (outward code/start only) */}
      <div className="mb-3">
        <AvField
          name="cdhId"
          label={'Postal Code District'}
          className="form-control"
          placeholder={'Enter Postal Code District (outward code/start only)'}
          type="text"
          errorMessage={errors.postCode ? (errors.postCode && touched.postCode) ? errors.postCode : '' : ''}
          onChange={(e, val) => { setFieldValue('postCode', val) }}
          value={values.postCode}
          required
        />
      </div>
      <div className="mb-3">
        <AvField
          name="cdhId"
          className="form-control"
          label={'Industry / Occupation'}
          placeholder={'Enter Industry / Occupation'}
          type="text"
          errorMessage={(touched.industry && errors.industry) ? errors.industry : ''}
          onChange={(e, val) => { setFieldValue('industry', val) }}
          value={values.industry}
          required
        />
      </div>
      {/* <div /> */}
      {/* Password */}
      <div className="mb-3 position-relative">
        <AvField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter Password"
          errorMessage={(touched.password && errors.password) ? errors.password : ''}
          onChange={(e, val) => setFieldValue('password', val)}
          value={values.password}
        />
        <div>
          <i onClick={() => setShowPassword(!showPassword)} className={!showPassword ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"} />
        </div>
      </div>
      {/* Confirm Password */}
      <div className="mb-3 position-relative">
        <AvField
          name="confirm_password"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          placeholder="Re-enter Password"
          errorMessage={(touched.confirm_password && errors.confirm_password) ? errors.confirm_password : ''}
          onChange={(e, val) => setConfirmPassword(val)}
          value={values.confirm_password}
        />
        <div>
          <i onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={!showConfirmPassword ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"} />
        </div>
      </div>
      <div>
        <div>
          <Label>
            {'I confirm that am I over 18 years old and agree to the '}
            <Label onClick={() => navigation.navigate('TermsOfUse')}>{' Terms of Use'}</Label>
          </Label>
        </div>
        <div >
          <Switch value={isTermsOfUse} color={colors.SEC_MAIN} onValueChange={(e) => onToggleTermsOfUseSwitch(e)} />
        </div>
      </div>
      {(errors.termsOfUse && touched.termsOfUse) && Error(errors.termsOfUse)}

      <div>
        <div>
          <Label>
            {'I have read and accept the '}
            <Label onClick={() => navigation.navigate('PrivacyPolicy')}>{' Privacy Notice'}</Label>
          </Label>
        </div>
        <div >
          {/* <Switch value={isPrivacy} color={colors.SEC_MAIN} onValueChange={(e) => onTogglePrivacySwitch(e)} /> */}
        </div>
      </div>
      {(errors.privacy && touched.privacy) && Error(errors.privacy)}
    </div>
  )
}