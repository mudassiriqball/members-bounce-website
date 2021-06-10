import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "helpers";

export default function getMyListings(token, refresh, _id, isHistory) {
  const [IS_LOADING, setLoading] = useState(false);
  const [MY_OFFERS, setList] = useState([]);

  useEffect(() => {
    setList([]);
  }, [refresh]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = () => {
      setLoading(true);
      axios({
        method: 'GET',
        url: urls.MY_PLAY_NOW_LISTINGS + _id,
        headers: {
          'authorization': token,
        },
        cancelToken: source.token,
        params: { history: isHistory }
      }).then(res => {
        setLoading(false)
        setList(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getMyListings  Error:', err);
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
    MY_OFFERS

  }
}
