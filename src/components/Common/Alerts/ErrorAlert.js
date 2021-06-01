import SweetAlert from "react-bootstrap-sweetalert";

const ErrorAlert = (props) => {
  const { onClick } = props;
  return (
    <SweetAlert
      title="Are you sure?"
      error
      confirmBtnBsStyle="danger"
      onConfirm={onClick}
      closeOnClickOutside={true}
    >
      Something went wrong, Please try again later
    </SweetAlert>
  )
}

export default ErrorAlert
