import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from '../helpers';

export default function getGolfCoursesRegAndProfile() {
  const [GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER, setList] = useState([]);
  const [GOLF_COURSES_LIST_REG_PROFILE, setOrignalList] = useState();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setList([]);
    setOrignalList([]);
    const getData = () => {
      axios({
        method: 'GET',
        url: urls.GOLF_COURSES_LIST_REG_AND_PROFILE,
        cancelToken: source.token
      }).then(res => {
        let arr = []
        res.data.data && res.data.data.forEach((item, index) => {
          arr.push({ id: index, name: item.course })
        });
        setOrignalList(res.data.data);
        setList(arr);
      }).catch(err => {
        if (axios.isCancel(err)) return
        console.log('getGolfCoursesRegAndProfile Error:', err);
      })
    }
    getData()
    return () => {
      source.cancel();
      getData;
    };
  }, [])

  return {
    GOLF_COURSES_LIST_REG_PROFILE_FOR_PICKER,
    GOLF_COURSES_LIST_REG_PROFILE
  }
}