import Button from "components/Common/Button"
import React, { useState } from "react"
import { Label } from "reactstrap"
import AvField from "availity-reactstrap-validation/lib/AvField"

export default function RegisterReview(props) {
  const { values, handleRegister, isSubmitting } = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <AvField
        label={"Signup as"}
        value={
          values.role === "customer"
            ? "Customer"
            : values.role === "courseManager"
            ? "Course Manager"
            : ""
        }
        disabled
      />
      <AvField label={"Email"} value={values.email} disabled />
      <AvField label={"First Name"} value={values.firstName} disabled />
      <AvField label={"Last Name"} value={values.lastName} disabled />
      <AvField label={"Date Of Birth"} value={values.dob} disabled />
      <AvField label={"Mobile"} value={values.mobile} disabled />
      <AvField
        label={"Industry / Occupation"}
        value={values.industry}
        disabled
      />
      {values.postCode !== "" && (
        <AvField
          label={"Postal Code District"}
          value={values.postCode}
          disabled
        />
      )}
      <AvField label={"Home Club"} value={values.homeClub} disabled />
      <AvField
        label={"Course Location"}
        value={values.courseLocation}
        disabled
      />
      <AvField
        label={"CDH ID/World Handicap Index"}
        value={values.cdhId}
        disabled
      />
      {/* <AvField
        label={'Password'}
        value={values.password}
        secureTextEntry={showPassword ? false : true}
        right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.SEC_MAIN} onClick={() => setShowPassword(!showPassword)} />}
        disabled
      /> */}
      <div className="mb-3 position-relative">
        <AvField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          value={values.password}
          disabled
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
      <div style={{ height: 30 }} />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        onClick={() => handleRegister()}
      >
        Register
      </Button>
    </div>
  );
}
