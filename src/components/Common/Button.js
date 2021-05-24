import React from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";

// block
// active
// size (lg, md, sm)
// outline
// loading

// Using Example
{/* <LoadingButton
  className="m-1"
  onClick={() => setLoading(!loading)}
  loading={stayLoading || loading}
  disabled={disabled}
  color={color}
  key={key}
  block={block}
  outline={outline}
> 
  Button
</LoadingButton>
*/}

export default ({ children, loading, block, color, ...rest }) => (
  <Button {...rest} color={color ? color : 'primary'} block={block}>
    {!(block && !loading) && (
      <Spinner
        className={classnames({
          "position-relative": true,
          "button-style": !block,
          visible: loading,
          invisible: !loading
        })}
        size="sm"
      // type="grow"
      />
    )}
    {!(block && loading) && (
      <span
        className={classnames({
          invisible: loading,
          visible: !loading,
          "span-style": !block
        })}
      >
        {children}
      </span>
    )}
  </Button>
);
