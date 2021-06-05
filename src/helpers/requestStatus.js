import theme from "constants/theme";

export const REQUEST_PENDING = 0;
export const REQUEST_ACCEPTED = 1;
export const REQUEST_DECLINED = 2;
export const REQUEST_DELETED = 3;
export const REQUEST_ACCEPTED_AND_PAID = 4;

// Match Status
export const MATCH_PENDING = 0;
export const MATCH_STARTED = 1;
export const MATCH_PLAYED = 2;
export const MATCH_CANCELLED = 3;

export const getRequestStatusText = (params) => {
  switch (params) {
    case REQUEST_PENDING:
      return 'Pending';
    case REQUEST_ACCEPTED:
      return 'Accepted';
    case REQUEST_DECLINED:
      return 'Declined';
    case REQUEST_DELETED:
      return 'Deleted';
    case REQUEST_ACCEPTED_AND_PAID:
      return 'Accepted & Paid';
    default:
      break;
  }
}

export const getRequestStatusColor = (params) => {
  switch (params) {
    case REQUEST_PENDING:
      return theme.LightThemeColors.PENDING;
    case REQUEST_ACCEPTED:
      return theme.LightThemeColors.SUCCESS;
    case REQUEST_DECLINED:
      return theme.LightThemeColors.RED;
    case REQUEST_DELETED:
      return theme.LightThemeColors.RED;
    case REQUEST_ACCEPTED_AND_PAID:
      return theme.LightThemeColors.SUCCESS;
    default:
      break;
  }
}

export const getMatchStatusText = (params) => {
  switch (params) {
    case MATCH_PENDING:
      return 'Pending';
    case MATCH_STARTED:
      return 'Started';
    case MATCH_PLAYED:
      return 'Played';
    case MATCH_CANCELLED:
      return 'Cancelled';

    default:
      break;
  }
}

export const getMatchStatusColor = (params) => {
  switch (params) {
    case MATCH_PENDING:
      return theme.LightThemeColors.PENDING;
    case MATCH_STARTED:
      return theme.LightThemeColors.SUCCESS;
    case MATCH_PLAYED:
      return theme.LightThemeColors.SUCCESS;
    case MATCH_CANCELLED:
      return theme.LightThemeColors.RED;
    default:
      break;
  }
}