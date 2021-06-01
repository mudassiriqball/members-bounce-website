import { Label } from "reactstrap";

const Error = (props) => {
  const { children, center } = props;

  return (
    <Label style={{ color: 'red', fontSize: '12px', textAlign: center ? 'center' : 'left', width: '100%' }}>
      {children}
    </Label>
  )
}

export default Error;
