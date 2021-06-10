import { Label, Row, Col } from "reactstrap";

const CardListItem = (props) => {
  const { label, value } = props;

  return (
    <Row className=''>
      <Col lg={5} md={5} sm={5}>
        <Label className='fw-bold'>{label}</Label>
      </Col>
      {/* {color && <Octicons name="primitive-dot" style={{ marginRight: 10, alignSelf: 'center' }} size={25} color={color} />} */}
      <Col lg={7} md={7} sm={7}>
        <Label className=''>{value}</Label>
      </Col>
    </Row>
  )
}

export default CardListItem;