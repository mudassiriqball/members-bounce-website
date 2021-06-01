import axios from "axios";
import { urls } from "../../helpers";

export default async function sendNotification(token, to, from, title, body, data) {
  await axios({
    method: 'POST',
    url: urls.SEND_NOTIFICATION + to,
    headers: {
      'authorization': token,
    },
    data: {
      from,
      title,
      body,
      data
    }
  }).then(res => {
  }).catch(err => {
    console.log('send notification err:', err);
  });
}