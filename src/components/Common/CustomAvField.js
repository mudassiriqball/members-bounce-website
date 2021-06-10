import AvField from 'availity-reactstrap-validation/lib/AvField';
import { Label } from 'reactstrap';
import Error from './Error';

const CustomAvField = (props) => {
  const { error, label, mandatory } = props;

  return (
    <div className="mb-3">
      <Label>{label}</Label>
      {mandatory && <span className="text-danger ms-1">&#9733;</span>}
      <AvField
        {...props}
        label={''}
        style={{ borderColor: error !== '' ? 'red' : 'lightgrey' }}
      />
      {error !== '' &&
        <Error>{error}</Error>
      }
    </div >
  )
}

export default CustomAvField;
