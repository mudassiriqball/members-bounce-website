const applyTopHundredFilters = (setList, data, filterBy, filterType) => {
  console.log(filterBy, filterType)
  try {
    if (filterBy === 'course') {
      setList([].concat(data)
        .sort((a, b) =>
          filterType === 'a_z' ?
            (a.course && a.course.toLowerCase()) > (b.course && b.course.toLowerCase()) ? 1 : -1
            :
            (a.course && a.course.toLowerCase()) < (b.course && b.course.toLowerCase()) ? 1 : -1
        ))
    } else if (filterBy === 'region') {
      setList([].concat(data)
        .sort((a, b) =>
          filterType === 'a_z' ?
            (a.region && a.region) > (b.region && b.region) ? 1 : -1
            :
            (a.region && a.region) < (b.region && b.region) ? 1 : -1
        ))
    } else if (filterBy === 'greenFee') {
      setList([].concat(data)
        .sort((a, b) =>
          filterType === 'a_z' ?
            (a.greenFee > b.greenFee) ? 1 : -1
            :
            (a.greenFee < b.greenFee) ? 1 : -1
        ))
    } else if (filterBy === 'courseType') {
      setList([].concat(data)
        .sort((a, b) =>
          filterType === 'a_z' ?
            (a.courseType && a.courseType) > (b.courseType && b.courseType) ? 1 : -1
            :
            (a.courseType && a.courseType) < (b.courseType && b.courseType) ? 1 : -1
        ))
    } else {
      setList(data);
    }
  } catch (error) {}
}

export default applyTopHundredFilters;