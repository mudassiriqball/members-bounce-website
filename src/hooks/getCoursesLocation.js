import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from 'helpers';

export default function getCoursesLocation() {
  const [COURSES_LOCATION_LIST, setList] = useState([]);

  useEffect(() => {
    setList([]);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getData = async () => {
      await axios({
        method: 'GET',
        url: urls.COURSES_LOCATION_LIST,
        cancelToken: source.token
      }).then(res => {
        let arr = [];
        res.data.data && res.data.data.forEach((item, index) => {
          arr.push({ id: index, name: item.name })
        })
        setList(arr);
      }).catch(err => {
        if (axios.isCancel(err)) return
        console.log('getCoursesLocation Error:', err);
      })
    }
    getData()
    return () => {
      source.cancel();
      getData;
    };
  }, [])

  return { COURSES_LOCATION_LIST };
}