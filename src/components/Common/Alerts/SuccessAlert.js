import SweetAlert from "react-bootstrap-sweetalert";

const SuccessAlert = (props) => {
  const { onClick } = props;

  return (
    <SweetAlert
      title="Success"
      success
      confirmBtnBsStyle="success"
      onConfirm={onClick}
      onCancel={onClick}
      closeOnClickOutside={true}
    >
      Your request was processed successfully.
    </SweetAlert>
  )
}

export default SuccessAlert
