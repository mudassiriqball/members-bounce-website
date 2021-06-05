import AvField from "availity-reactstrap-validation/lib/AvField"
import Error from "components/Common/Error"
import React, { useState } from "react"
import Select from "react-select"
import { Label, Input } from "reactstrap"
import Switch from "react-switch"
import { Link } from "react-router-dom"

export default function PersonalInfo(props) {
  const {
    GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER,
    COURSES_LOCATION_LIST,
    values,
    handleChange,
    errors,
    setFieldError,
    touched,
    handleBlur,
    setFieldValue,
    setErrorAlert, setErrMsg, setSuccessAlert
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Switch
  const [isCourseManager, setIsCourseManager] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [isTermsOfUse, setIsTermsOfUse] = useState(false)
  const [isPrivacy, setIsPrivacy] = useState(false)
  // my siwthch
  const [checkedCM, setCheckedCM] = useState(false)
  const [checkedNM, setCheckedNM] = useState(false)
  const [checkedTOU, setCheckedTOU] = useState(false)
  const [checkedPN, setCheckedPN] = useState(false)

  const onToggleCourseManagerSwitch = e => {
    setIsCourseManager(e)
    if (e) {
      setFieldValue("role", "courseManager")
    } else {
      setFieldValue("role", "customer")
    }
  }
  const onToggleMemberSwitch = e => {
    setIsMember(e)
    if (e) {
      setFieldValue("isMember", false)
    } else {
      setFieldValue("isMember", true)
    }
  }
  const onToggleTermsOfUseSwitch = e => {
    setIsTermsOfUse(e)
    setFieldValue("termsOfUse", e)
  }
  const onTogglePrivacySwitch = e => {
    setIsPrivacy(e)
    setFieldValue("privacy", e)
  }

  return (
    <div>
      {/* Signup As*/}
      {/* <div>
        <Label>Signup as Course Manager?</Label>
        
      </div> */}
      <div class="row">
        <div class="col text-start">
          <Label>Signup as Course Manager?</Label>
        </div>
        <div class="col text-end">
          <div className="form-check form-switch form-switch-lg mb-3 d-flex justify-content-end">
            <input
              type="checkbox"
              className="form-check-input text-end"
              onChange={() => setCheckedCM(!checkedCM)}
              checked={checkedCM}
              id="customSwitchsizelg"
              defaultChecked
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <Label>Not a member?</Label>
        </div>

        <div class="col text-end">
          <div className="form-check form-switch form-switch-lg mb-3 d-flex justify-content-end">
            <input
              type="checkbox"
              className="form-check-input text-end"
              onChange={() => setCheckedNM(!checkedNM)}
              checked={checkedNM}
              id="customSwitchsizelg"
              defaultChecked
            />
          </div>
        </div>
      </div>
      {/* {
            <AvField
            name="dob"
            // label="Last Name"
            className="form-control"
            type="date"
            defaultValue="1900-0-19"
            id="example-date-input"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="{new Date().today.getDate()+'-'+(today.getMonth()+1)+'-'+getFullYear()}"
            errorMessage={(touched.dob && errors.dob) ? errors.dob : ''}
            onChange={(e, val) => setFieldValue('dob', val)}
            value={values.dob}
            required
          />
          } */}

      {!checkedNM ? (
        <>
          {/* Home Club */}
          <div className="mb-3">
            <Label>Home Club</Label>
            <Select
              name="homeClub"
              value={values.homeClub}
              onChange={(value, id, index) => setFieldValue("homeClub", value)}
              options={GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER}
              classNamePrefix="select2-selection"
            />
          </div>

          {/* Course Loction */}
          <div className="mb-3">
            <Label>Course Location</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <Select
              name="courseLocation"
              value={values.courseLocation}
              onChange={(value, id, index) =>
                setFieldValue("courseLocation", value)
              }
              options={COURSES_LOCATION_LIST}
              classNamePrefix="select2-selection"
              required
            />
          </div>
          {/* <AvField
            name="home"
            label="Home Club"
            selectedValue={values.homeClub}
            onChange={(value, id, index) =>
              setFieldValue('homeClub', value)
            }
            padding={-4}
            errorMessage={errors.homeClub ? errors.homeClub && touched.homeClub ? errors.homeClub : '' : ''}
            options={GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER}
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
            <Label>CDH ID/World Handicap Index</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <AvField
              name="cdhId"
              // label="CDH ID/World Handicap Index"
              className="form-control"
              placeholder={"Enter CDH ID / World Handicap Index"}
              type="text"
              errorMessage={touched.cdhId && errors.cdhId ? errors.cdhId : ""}
              onChange={(e, val) => {
                setFieldValue("cdhId", val)
              }}
              value={values.cdhId}
              required
            />
          </div>

          {/* Postal Code District (outward code/start only) */}
          <div className="mb-3">
            <Label>Postal Code District</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <AvField
              name="postCode"
              // label={'Postal Code District'}
              className="form-control"
              placeholder={
                "Enter Postal Code District (outward code/start only)"
              }
              type="text"
              errorMessage={
                errors.postCode
                  ? errors.postCode && touched.postCode
                    ? errors.postCode
                    : ""
                  : ""
              }
              onChange={(e, val) => {
                setFieldValue("postCode", val)
              }}
              value={values.postCode}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Industry / Occupation</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <AvField
              name="industry"
              className="form-control"
              // label={'Industry / Occupation'}
              placeholder={"Enter Industry / Occupation"}
              type="text"
              errorMessage={
                touched.industry && errors.industry ? errors.industry : ""
              }
              onChange={(e, val) => {
                setFieldValue("industry", val)
              }}
              value={values.industry}
              required
            />
          </div>
        </>
      ) : (
        // if not member
        <>
          {/* Postal Code District (outward code/start only) */}
          <div className="mb-3">
            <Label>Postal Code District</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <AvField
              name="postCode"
              // label={'Postal Code District'}
              className="form-control"
              placeholder={
                "Enter Postal Code District (outward code/start only)"
              }
              type="text"
              errorMessage={
                errors.postCode
                  ? errors.postCode && touched.postCode
                    ? errors.postCode
                    : ""
                  : ""
              }
              onChange={(e, val) => {
                setFieldValue("postCode", val)
              }}
              value={values.postCode}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Industry / Occupation</Label>
            <span className="text-danger ms-1">&#9733;</span>
            <AvField
              name="industry"
              className="form-control"
              // label={'Industry / Occupation'}
              placeholder={"Enter Industry / Occupation"}
              type="text"
              errorMessage={
                touched.industry && errors.industry ? errors.industry : ""
              }
              onChange={(e, val) => {
                setFieldValue("industry", val)
              }}
              value={values.industry}
              required
            />
          </div>
        </>
      )}
      {/* <div /> */}
      {/* Password */}
      <div className="mb-3 position-relative">
        <AvField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter Password"
          errorMessage={
            touched.password && errors.password ? errors.password : ""
          }
          onChange={(e, val) => setFieldValue("password", val)}
          value={values.password}
        />
        <div style={{ position: "absolute", top: 37, right: 10 }}>
          <i
            onClick={() => setShowPassword(!showPassword)}
            className={
              !showPassword ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"
            }
          />
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
          errorMessage={
            touched.confirm_password && errors.confirm_password
              ? errors.confirm_password
              : ""
          }
          onChange={(e, val) => setShowConfirmPassword(val)}
          value={values.confirm_password}
        />
        <div style={{ position: "absolute", top: 37, right: 10 }}>
          <i
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={
              !showConfirmPassword
                ? "mdi mdi-eye-outline"
                : "mdi mdi-eye-off-outline"
            }
          />
        </div>
      </div>
      <div>
        <div>
          <div class="row">
            <div class="col text-start">
              <p>
                I confirm that am I over 18 years old and agree to the
                <Link to="" style={{ color: "blue" }}>
                  Term of User
                </Link>
              </p>
            </div>
            <div class="col text-end">
              <div className="form-check form-switch form-switch-lg mb-3 d-flex justify-content-end">
                <input
                  type="checkbox"
                  className="form-check-input text-end"
                  onChange={() => setCheckedTOU(!checkedTOU)}
                  checked={checkedTOU}
                  id="customSwitchsizelg"
                  defaultChecked
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col text-start">
              <p>
                I have read and accept the{" "}
                <Link to="" style={{ color: "blue" }}>
                  Privacy Notice
                </Link>
              </p>
            </div>
            <div class="col text-end">
              <div className="form-check form-switch form-switch-lg mb-3 d-flex justify-content-end">
                <input
                  type="checkbox"
                  className="form-check-input text-end"
                  onChange={() => setCheckedPN(!checkedPN)}
                  checked={checkedPN}
                  id="customSwitchsizelg"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div >
          <Switch value={isTermsOfUse} color={colors.SEC_MAIN} onValueChange={(e) => onToggleTermsOfUseSwitch(e)} />
        </div> */}
      </div>
      {errors.termsOfUse && touched.termsOfUse && Error(errors.termsOfUse)}

      <div>
        <div>
          {/* <Label>
            {"I have read and accept the "}
            <Label onClick={() => navigation.navigate("PrivacyPolicy")}>
              {" Privacy Notice"}
            </Label>
          </Label> */}
        </div>
        <div>
          {/* <Switch value={isPrivacy} color={colors.SEC_MAIN} onValueChange={(e) => onTogglePrivacySwitch(e)} /> */}
        </div>
      </div>
      {errors.privacy && touched.privacy && Error(errors.privacy)}
    </div>
  )
}
