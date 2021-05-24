import { Label } from "reactstrap";

const Error = (props) => {
  const { children } = props;

  return (
    <Label style={{ color: 'red', fontSize: '12px', textAlign: 'center', width: '100%' }}>
      {children}
    </Label>
  )
}

export default Error;
