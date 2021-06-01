import moment from "moment"

const applyPlayNowFilters = (setList, data, filterBy, filterType) => {
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
                        (a.club && a.club.toLowerCase()) > (b.club && b.club.toLowerCase()) ? 1 : -1
                        :
                        (a.club && a.club.toLowerCase()) < (b.club && b.club.toLowerCase()) ? 1 : -1
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
            // } else if (filterBy === 'cost') {
            //     setList([].concat(data)
            //         .sort((a, b) =>
            //             filterType === 'a_z' ?
            //                 (a.cost > b.cost) ? 1 : -1
            //                 :
            //                 (a.cost < b.cost) ? 1 : -1
            //         ))
        } else {
            setList(data);
        }
    } catch (error) { }
}

export default applyPlayNowFilters;