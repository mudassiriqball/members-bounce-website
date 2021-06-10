import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "../../helpers";

export default function getHomeClubPlayNowOffers(token, refresh) {
  const [IS_LOADING, setLoading] = useState(false);
  const [HOME_CLUB_PLAY_NOW_LIST, setList] = useState([]);

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
        url: urls.HOME_CLUB_PLAY_NOW_LIST,
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
        console.log('getHomeClubPlayNowOffers  Error:', err);
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
    HOME_CLUB_PLAY_NOW_LIST

  }
}
