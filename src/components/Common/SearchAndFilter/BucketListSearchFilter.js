import { useState } from "react";
import { Row, Col, Card, CardBody, ModalBody, Modal, ModalHeader, Button, Label } from "reactstrap";
import Select from "react-select"

const BucketListSearchFilter = (props) => {
  const { handleSearch, query } = props;
  const [showModel, setShowModel] = useState();

  return (
    <div>
      <FilterModel
        visible={showModel}
        onHide={() => setShowModel(false)}
        {...props}
      />
      <div className='d-flex flex-row align-items-center justify-content-between w-100'>
        <form className="app-search d-none d-lg-block w-50">
          <div className="position-relative">
            <input
              type="text"
              value={query}
              className="form-control bg-white text-black-50 search"
              placeholder={"Search here"}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {query !== '' ?
              <span className='bx bxs-x-circle text-danger' style={{ cursor: 'pointer' }} onClick={() => handleSearch('')} />
              :
              <span className="bx bx-search-alt text-black-50" />
            }
          </div>
        </form>
        <i class='bx bx-slider-alt bx-md' onClick={() => setShowModel(true)}></i>
      </div>
      <hr />
    </div >
  )
}

const FilterModel = (props) => {
  const {
    visible, onHide, applyFilter, clearFilter,
    filterBy, setFilterBy,
    filterType, setFilterType
  } = props;

  return (
    <Modal isOpen={visible} toggle={onHide} className={props.className}>
      <ModalBody>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <h4 className='p-0 m-0'>SORT BY</h4>
          <i class='bx bx-window-close text-danger bx-md' onClick={onHide} ></i>
        </div>
        <hr />
        <Row>
          <div className="mb-3">
            <Label className="control-label">Course Name</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              value={filterBy === 'course' ? filterType === 'a_z' ? { value: 'a_z', label: 'A-Z' } : { value: 'z_a', label: 'Z-A' } : ""}
              onChange={(data) => {
                setFilterBy('course');
                setFilterType(data.value);
              }}
              options={[
                { value: "a_z", label: "A-Z" },
                { value: "z_a", label: "Z-A" },
              ]}
            />
          </div>
          <div className="mb-3">
            <Label className="control-label">Region</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              value={filterBy === 'region' ? filterType === 'a_z' ? { value: 'a_z', label: 'A-Z' } : { value: 'z_a', label: 'Z-A' } : ""}
              onChange={(data) => {
                setFilterBy('region');
                setFilterType(data.value);
              }}
              options={[
                { value: "a_z", label: "A-Z" },
                { value: "z_a", label: "Z-A" },
              ]}
            />
          </div>
          <div className="mb-3">
            <Label className="control-label">Green Fee</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              value={filterBy === 'greenFee' ? filterType === 'a_z' ? 'Grater First' : 'Smaller First' : ""}
              onChange={(data) => {
                setFilterBy('greenFee');
                setFilterType(data.value);
              }}
              options={[
                { value: "a_z", label: "Greater First" },
                { value: "z_a", label: "Smaller First" },
              ]}
            />
          </div>
          <div className="mb-3">
            <Label className="control-label">Course Type</Label>
            <Select
              classNamePrefix="select2-selection"
              placeholder="Choose..."
              value={filterBy === 'courseType' ? filterType === 'a_z' ? { value: 'a_z', label: 'A-Z' } : { value: 'z_a', label: 'Z-A' } : ""}
              onChange={(data) => {
                setFilterBy('courseType');
                setFilterType(data.value);
              }}
              options={[
                { value: "a_z", label: "A-Z" },
                { value: "z_a", label: "Z-A" },
              ]}
            />
          </div>
        </Row>
        <hr />
        {/* Buttons */}
        <Row>
          <Col>
            <Button color="primary" class="btn btn-primary" onClick={() => { applyFilter(), onHide() }}>Apply</Button>
          </Col>
          <Col className='justify-content-end d-flex'>
            <Button color="danger" class="btn btn-danger" onClick={() => { clearFilter(), onHide() }}>Clear</Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default BucketListSearchFilter;
