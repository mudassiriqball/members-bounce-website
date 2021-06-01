import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "../../helpers";

export default function getTopHundredPlayNowOffers(token, refresh) {
  const [IS_LOADING, setLoading] = useState(false);
  const [TOP_HUNDRED_OFFERS, setList] = useState([]);

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
        url: urls.TOP_HUNDRED_PLAY_NOW_OFFERS,
        headers: {
          'authorization': token,
        },
        cancelToken: source.token
      }).then(res => {
        setLoading(false)
        setList(res.data.data);
      }).catch(err => {
        setLoading(false)
        if (axios.isCancel(err)) return
        console.log('getTopHundredPlayNowOffers  Error:', err);
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
    TOP_HUNDRED_OFFERS

  }
}
