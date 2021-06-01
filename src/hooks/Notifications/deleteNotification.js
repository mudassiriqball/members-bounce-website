import axios from "axios";
import { urls } from "helpers";

export default async function deleteNotification(token, user_id, notification_id) {
  try {
    await axios({
      method: 'PUT',
      url: urls.DELETE_SINGLE_NOTIFICATION + user_id,
      headers: {
        'authorization': token,
      },
      params: {
        _id: notification_id,
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}