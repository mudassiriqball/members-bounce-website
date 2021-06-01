import axios from "axios";
import { urls } from "helpers";

export default async function markAsReadNotification(token, user_id, notification_id) {
  try {
    const response = await axios({
      method: 'PUT',
      url: urls.MARK_READ__NOTIFICATION + user_id,
      headers: {
        'authorization': token,
      },
      params: {
        _id: notification_id,
      }
    });
    return true;
  } catch (error) {
    console.log('markAsReadNotification err:', error);
    return false;
  }
}