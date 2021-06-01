import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../helpers';

export default function getMembersOnlyClubs() {
  const [MEMBERS_ONLY_CLUBS_FOR_PICKER, setList] = useState([]);
  const [MEMBERS_ONLY_CLUBS, setOrignalList] = useState();
  const [IS_LOADING, setLoading] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setList([]);
    setOrignalList([]);
    setLoading(true);
    const getData = () => {
      axios({
        method: 'GET',
        url: urls.MEMBERS_ONLY_CLUBS,
        cancelToken: source.token
      }).then(res => {
        let arr = []
        res.data.data && res.data.data.forEach((item, index) => {
          arr.push({ id: index, name: item.course })
        });
        setOrignalList(res.data.data);
        setList(arr);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        if (axios.isCancel(err)) return
        console.log('getMembersOnlyClubs Error:', err);
      })
    }
    getData()
    return () => {
      source.cancel();
      getData;
    };
  }, [])

  return {
    IS_LOADING,
    MEMBERS_ONLY_CLUBS_FOR_PICKER,
    MEMBERS_ONLY_CLUBS
  }
}