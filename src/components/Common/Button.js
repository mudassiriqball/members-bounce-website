import React from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";

export default ({ children, loading, block, color, width, ...rest }) => (
  <Button {...rest} color={color ? color : 'primary'} block={block} style={{ width: width ? width : '100%' }}>
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
  </Button>
);
