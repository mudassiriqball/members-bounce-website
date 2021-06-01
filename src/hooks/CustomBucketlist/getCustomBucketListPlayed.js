import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from 'helpers';

export default function getCustomBucketListPlayed(token, refresh, _id) {
  const [IS_LOADING, setLoading] = useState(false);
  const [TOP_HUNDRED_PLAYED, setBucketList] = useState([]);

  useEffect(() => {
    setBucketList([]);
  }, [refresh]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = () => {
      setLoading(true);
      axios({
        method: 'GET',
        url: urls.CUSTOM_BUCKET_LIST_PLAYED + _id,
        headers: {
          'authorization': token,
        },
        cancelToken: source.token
      }).then(res => {
        setLoading(false)
        setBucketList(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getCustomBucketListPlayed  Error:', err);
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
    TOP_HUNDRED_PLAYED

  }
}
