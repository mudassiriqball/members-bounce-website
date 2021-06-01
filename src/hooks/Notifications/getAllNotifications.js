import axios from "axios";
import { urls } from "../../helpers";
import { useEffect, useState } from 'react';

export default function getAllNotifications(token, user_id, refresh) {
  const [IS_LOADING, setIsLoading] = useState(false);
  const [NOTIFICATIONS, setList] = useState([]);
  const [IS_UNREAD, setIS_UNREAD] = useState(false);
  const [UNREAD_COUNT, setUNREAD_COUNT] = useState(0);

  useEffect(() => {
    setList([]);
    setIS_UNREAD(false);
    setUNREAD_COUNT(0);
  }, [refresh]);

  useEffect(() => {
    setList([]);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = async () => {
      setIsLoading(true);
      setList([]);
      setIS_UNREAD(false);
      setUNREAD_COUNT(0);
      await axios({
        method: 'GET',
        headers: {
          'authorization': token,
        },
        url: urls.USER_ALL_NOTIFICATION + user_id,
        cancelToken: source.token,
      }).then(res => {
        try {
          let count = 0;
          setList(res.data.data.notifications.reverse());
          res.data.data.notifications && res.data.data.notifications.forEach(element => {
            if (element.read === false) {
              setIS_UNREAD(true);
              count += 1;
            }
          });
          setUNREAD_COUNT(count);
        } catch (err) {
        }
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
        if (axios.isCancel(err)) return
        console.log('getAllNotifications Error:', err);
      })
    }
    if (token)
      getData();
    return () => {
      source.cancel();
      getData;
    };
  }, [token, user_id, refresh]);

  return { IS_LOADING, NOTIFICATIONS, IS_UNREAD, UNREAD_COUNT };
}