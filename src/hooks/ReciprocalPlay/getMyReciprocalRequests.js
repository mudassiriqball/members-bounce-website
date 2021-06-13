import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "../../helpers";

export default function getMyReciprocalRequests(token, refresh, _id, isHistory) {
  const [IS_LOADING, setLoading] = useState(false);
  const [MY_REQUESTS, setList] = useState([]);

  useEffect(() => {
    setList([]);
  }, [refresh]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = async () => {
      setLoading(true);
      await axios({
        method: 'GET',
        url: urls.MY_RECIPROCAL_PLAY_REQUESTS + _id,
        headers: {
          'authorization': token,
        },
        params: { history: isHistory },
        cancelToken: source.token
      }).then(res => {
        setLoading(false)
        setList(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getMyReciprocalRequests  Error:', err);
      });
    }
    if (token && _id) {
      getData();
    }
    return () => {
      source.cancel();
      getData;
    };
  }, [token, refresh])

  return {
    IS_LOADING,
    MY_REQUESTS

  }
}
