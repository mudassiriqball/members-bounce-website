import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../../helpers';

export default function getMyCustomBucketList(token, refresh, _id) {
  const [IS_LOADING, setLoading] = useState(false);
  const [MY_BUCKET_LIST, setBucketList] = useState([]);

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
        url: urls.MY_CUSTOM_BUCKET_LIST + _id,
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
        console.log('getMyCustomBucketList  Error:', err);
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
    MY_BUCKET_LIST
  }
}
