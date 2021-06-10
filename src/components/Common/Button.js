import React from "react";
import { Button as RButton, Spinner } from "reactstrap";
import classnames from "classnames";

const Button = ({ children, loading, block, color, width, ...rest }) => (
  <RButton {...rest} color={color ? color : 'primary'} block={block} style={{ width: width ? width : '100%' }}>
    {loading && <Spinner
      className={classnames({
        "position-relative": true,
        "button-style": !block,
        visible: loading,
        invisible: !loading
      })}
      size="sm"
    />}
    {!loading && children}
  </RButton>
);

export default Button;
