import SweetAlert from "react-bootstrap-sweetalert";

const SuccessAlert = (props) => {
  const { onClick, msg } = props;

  return (
    <SweetAlert
      title="Success"
      success
      confirmBtnBsStyle="success"
      onConfirm={onClick}
      onCancel={onClick}
      closeOnClickOutside={true}
    >
      {msg ? msg : 'Your request was processed successfully.'}
    </SweetAlert>
  )
}

export default SuccessAlert
