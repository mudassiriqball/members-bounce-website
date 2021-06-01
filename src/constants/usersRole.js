
const CUSTOMER = 'customer';
const COURSE_MANAGER = 'courseManager';
const ADMIN = 'admin';

export default {
    CUSTOMER,
    COURSE_MANAGER,
    ADMIN,
}

export const getUserRole = (params) => {
    switch (params) {
        case CUSTOMER:
            return 'Customer';
        case COURSE_MANAGER:
            return 'Course Manager';
        case ADMIN:
            return 'Admin';
        default:
            return '';
    }
}