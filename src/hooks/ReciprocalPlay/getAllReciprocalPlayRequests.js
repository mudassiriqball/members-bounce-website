import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "helpers";

export default function getAllReciprocalPlayRequests(token, refresh) {
  const [IS_LOADING, setLoading] = useState(false);
  const [ALL_REQUESTS, setList] = useState([]);

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
        url: urls.RECIPROCAL_PLAY_ALL_REQUESTS,
        headers: {
          'authorization': token,
        },
        cancelToken: source.token
      }).then(res => {
        setLoading(false);
        setList(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getAllReciprocalPlayRequests  Error:', err);
      });
    }
    if (token) {
      getData();
    }
    return () => {
      source.cancel();
      getData;
    };
  }, [token, refresh])

  return {
    IS_LOADING,
    ALL_REQUESTS
  }
}
