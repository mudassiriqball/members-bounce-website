import axios from "axios";
import { urls } from "../../helpers";

export default async function deleteAllNotifications(token, user_id, read) {
  try {
    await axios({
      method: 'DELETE',
      url: urls.DELETE_ALL_NOTIFICATIONS + user_id,
      headers: {
        'authorization': token,
      },
      params: { read },
    });
    return true;
  } catch (error) {
    console.log('deleteAllNotifications err:', error);
    return false;
  }
}