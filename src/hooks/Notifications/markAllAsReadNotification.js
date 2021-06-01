import axios from "axios";
import { urls } from "../../helpers";

export default async function markAllAsReadNotification(token, user_id) {
  try {
    await axios({
      method: 'PUT',
      url: urls.MARK_ALL_READ_NOTIFICATION + user_id,
      headers: {
        'authorization': token,
      },
    });
    return true;
  } catch (error) {
    console.log('markAllAsReadNotification err:', err);
    return false;
  }
}