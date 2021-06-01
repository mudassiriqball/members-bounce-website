import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../../helpers';

export default function getTopHundredBucketList(token, refresh) {
  const [IS_LOADING, setLoading] = useState(false);
  const [BUCKET_LIST, setBucketList] = useState([]);

  useEffect(() => {
    setBucketList([]);
  }, [refresh]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = async () => {
      setLoading(true);
      await axios({
        method: 'GET',
        url: urls.TOP_100_BUCKET_LIST,
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
        console.log('Get User By page limit Error:', err);
      })
    }
    if (token !== null)
      getData();
    return () => {
      source.cancel();
      getData;
    };
  }, [token, refresh])

  return {
    IS_LOADING,
    BUCKET_LIST
  }
}