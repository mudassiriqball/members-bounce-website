import Select from "react-select"
import { Label } from 'reactstrap';
import Error from './Error';



const CustomSelect = (props) => {
  const { error, label, mandatory } = props;

  return (
    <div className="mb-3">
      <Label>{label}</Label>
      {mandatory && <span className="text-danger ms-1">&#9733;</span>}
      <div style={{ border: error !== '' ? '1px solid red' : '0px solid lightgrey', borderRadius: 5 }}>
        <Select  {...props} />
      </div>
      {error !== '' &&
        <Error>{error}</Error>
      }
    </div >
  )
}

export default CustomSelect;