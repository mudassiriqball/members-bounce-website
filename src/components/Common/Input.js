import { FormGroup, Input, Label } from "reactstrap";

export default ({label,placeholder, id, type, name}) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input type={type ? type: 'text'} name={name} id={id} placeholder={placeholder} />
  </FormGroup>
)