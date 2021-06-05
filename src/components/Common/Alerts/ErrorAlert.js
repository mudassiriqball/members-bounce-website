import SweetAlert from "react-bootstrap-sweetalert";

const ErrorAlert = (props) => {
  const { onClick, msg } = props;
  return (
    <SweetAlert
      title="Error"
      error
      confirmBtnBsStyle="danger"
      onConfirm={onClick}
      closeOnClickOutside={true}
    >
      {msg ? msg : 'Something went wrong, Please try again later.'}
    </SweetAlert>
  )
}

export default ErrorAlert
