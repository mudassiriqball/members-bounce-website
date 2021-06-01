import SweetAlert from "react-bootstrap-sweetalert";

const AccessDenied = (props) => {
  const { onClick } = props;

  return (
    <SweetAlert
      title="Access Denied"
      warning
      confirmBtnBsStyle='danger'
      onConfirm={onClick}
      closeOnClickOutside={true}
    >
      Please upgrade your level to access this feature.
    </SweetAlert>
  )
}

export default AccessDenied;
