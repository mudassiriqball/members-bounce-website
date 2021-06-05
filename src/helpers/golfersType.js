
const ALL_AND_ANY = 'anyAll';
const PRIVATE_CLUB = 'privateClub';
const MEMBERS_ONLY = 'membersOnly';
const NOMAD = 'nomad';
const COURSE_MANAGER = 'courseManager';
const INDIVIDUAL = 'individual';
const CORPORATE = 'corporates';
const HOME_CLUB_ONLY = 'homClubOnly';

export default {
    ALL_AND_ANY,
    PRIVATE_CLUB,
    MEMBERS_ONLY,
    NOMAD,
    COURSE_MANAGER,
    INDIVIDUAL,
    CORPORATE,
    HOME_CLUB_ONLY
}

export const getGolferType = (params) => {
    switch (params) {
        case ALL_AND_ANY:
            return 'Any and All';
        case PRIVATE_CLUB:
            return 'Private Club Member';
        case MEMBERS_ONLY:
            return 'Members Only Club';
        case NOMAD:
            return 'Nomad';
        case COURSE_MANAGER:
            return 'Course Manager';
        case INDIVIDUAL:
            return 'Independent/Casual';
        case CORPORATE:
            return 'Corporate';
        case HOME_CLUB_ONLY:
            return 'Only Home Club'
        default:
            return '';
    }
}