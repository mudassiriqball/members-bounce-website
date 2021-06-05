
// import AvField from 'availity-reactstrap-validation/lib/AvField';
import Error from './Error';

const CustomAvField = (props) => {
  const { error, otherProps } = props;
  return (
    <div className="mb-3">
      {/* <div style={{ border: error ? `1px solid $danger` : '1px solid lightgrey' }}> */}
      {/* <AvField
        {...otherProps}
      /> */}
    </div>
    // {error !== '' &&
    //   <Error>{error}</Error>
    // }
    // </div >
  )
}

export default CustomAvField;
