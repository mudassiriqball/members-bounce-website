import moment from "moment"

const applyReciprocalPlayFilters = (setList, data, filterBy, filterType) => {
    console.log(filterBy, filterType)
    try {
        if (filterBy === 'date') {
            setList([].concat(data)
                .sort((a, b) =>
                    filterType === 'a_z' ?
                        (moment(a.date, "DD-MM-YYYY HH:mm:ss").diff(moment(b.date, "DD-MM-YYYY HH:mm:ss")) > 0) ? 1 : -1
                        :
                        (moment(a.date, "DD-MM-YYYY HH:mm:ss").diff(moment(b.date, "DD-MM-YYYY HH:mm:ss")) < 0) ? 1 : -1
                ))
        } else if (filterBy === 'course') {
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
        } else {
            setList(data);
        }
    } catch (error) { }
}

export default applyReciprocalPlayFilters;