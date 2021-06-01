import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "helpers";

export default function getUserById(token, _id) {
  const [IS_LOADING, setLoading] = useState(false);
  const [USER, setUser] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = async () => {
      setLoading(true);
      await axios({
        method: 'GET',
        url: urls.USER_BY_ID + _id,
        headers: {
          'authorization': token,
        },
        cancelToken: source.token
      }).then(res => {
        setLoading(false)
        setUser(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getUserById  Error:', err);
      });
    }
    if (token && _id !== '') {
      getData();
    }
    return () => {
      source.cancel();
      getData;
    };
  }, [token, _id])

  return {
    IS_LOADING,
    USER
  }
}
