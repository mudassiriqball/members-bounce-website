import moment from "moment";
const SERVER_FORMATE = 'DD-MM-YYYY HH:mm:ss';
const SERVER_FORMATE_ONLY_DATE = 'DD-MM-YYYY';
const DOB_PICKER_FORMATE = 'MM-DD-YYYY';
const SERVER_ALPHABET_FORMATE = 'Do MMM YYYY h:mm a';
const SERVER_ALPHABET_FORMATE_ONLY_DATE = 'Do MMM YYYY';

export const convertToServerFormate = date => {
  return moment(date).format('DD-MM-YYYY');
}
export const convertToServerFormatDateOnly = date => {
  return moment(date).format(SERVER_FORMATE);
}
export const convertToServerAlphabetFormat = date => {
  return moment(date).format(SERVER_ALPHABET_FORMATE);
}

export const convertToAlphabetFromServerFormat = (date, isOnlyDate) => {
  if (isOnlyDate)
    return moment(date, SERVER_FORMATE_ONLY_DATE).format(SERVER_ALPHABET_FORMATE_ONLY_DATE);
  else
    return moment(date, SERVER_FORMATE).format(SERVER_ALPHABET_FORMATE);
}

export const getMaxDateForDob = () => {
  return moment().format(DOB_PICKER_FORMATE);
}

export const convertToDOBFormate = () => {
  return moment(DOB_PICKER_FORMATE).format('DD-MM-YYYY');
}

export const convertFromDbToServerAlphabet = (date) => {
  return moment(date).format(SERVER_ALPHABET_FORMATE);
}

export const getDateAfter3Months = () => {
  return moment().add(3, "months").toDate();
};

const dateUtility = {};
export default dateUtility;


// export const getDay = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).date();
// };

// export const convertToUTC = dateTime => {
//     return moment(dateTime).utc().format(SERVER_DATE_FORMAT);
// };

// export const convertToLocal = dateTime => {
//     return moment
//         .utc(dateTime, SERVER_DATE_FORMAT)
//         .local()
//         .format("MMM Do YYYY, h:mm a");
// };

// export const convertToLocalOnlyYear = dateTime => {
//     return moment.utc(dateTime, "YYYY-MM-DD hh:mm").local().format("MMM Do YYYY");
// };

// export const convertToLocalOnlyTime = dateTime => {
//     return moment.utc(dateTime, "YYYY-MM-DD hh:mm").local().format("h:mm a");
// };

// export const convertToLocalInDigitsFormat = dateTime => {
//     return moment
//         .utc(dateTime, SERVER_DATE_FORMAT)
//         .local()
//         .format(SERVER_DATE_FORMAT);
// };

// export const convertToLocalInDigitsFormatOnlyYear = dateTime => {
//     return moment.utc(dateTime, SERVER_DATE_FORMAT).local().format("DD-MM-YYYY");
// };

// export const getTime = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).format("hh:mm A");
// };

// export const getFullDayString = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).format("dddd, MMMM Do YYYY");
// };



// export const getDetailedFullDayString = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).format("LLLL");
// };

// export const getYears = dateTime => {
//     return moment().diff(moment(dateTime, SERVER_DATE_FORMAT), "years");
// };

// export const getEndOfMonthDateTime = dateTime => {
//     return moment(dateTime).endOf("month").format("YYYY-MM-DD HH:mm");
// };

// export const convertToUnix = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).unix();
// };

// export const convertToNormalFromUnix = unixFormat => {
//     return moment.unix(unixFormat).format(SERVER_DATE_FORMAT);
// };

// export const toServerFormat = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).utc().format(SERVER_DATE_FORMAT);
// };

// export const toServerFormat2 = dateTime => {
//     return moment(dateTime, "DD-MM-YYYY hh:mm:ss")
//         .utc()
//         .format(SERVER_DATE_FORMAT);
// };

// export const toYearMonthDayOnlyInDigitsFormate = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).utc().format("YYYY-MM-DD");
// };

// export const toDayMonthYearOnlyInDigitsFormate = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).utc().format("DD-MM-YYYY");
// };

// export const fromYearMonthDayToOnlyInAlphabat = dateTime => {
//     return moment(dateTime, "YYYY-MM-DD").utc().format("MMMM Do YYYY");
// };

// export const yearMonthDayToDayMonthYear = dateTime => {
//     return moment(dateTime, "YYYY-MM-DD").utc().format("DD-MM-YYYY");
// };

// export const getOnlyDateDayInDigit = () => {
//     return moment(new Date()).format("DD");
// };
// export const toServerFormat3 = dateTime => {
//     return moment(dateTime, SERVER_DATE_FORMAT).utc().format("YYYY-MM-DD");
// };

// export const convertToLocalInServerFormat = dateTime => {
//     return moment
//         .utc(dateTime, SERVER_DATE_FORMAT)
//         .local()
//         .format(SERVER_DATE_FORMAT);
// };

// export const DifferenBetweenTwoDateInMinutes = (endTime, startDate) => {
//     return moment
//         .utc(
//             moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(
//                 moment(startDate, "DD/MM/YYYY HH:mm:ss"),
//             ),
//         )
//         .format("HH:mm:ss");
// };
