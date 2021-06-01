import { useEffect, useState } from 'react';
import axios from 'axios';
import { urls } from "../helpers";

export default async function getUserByIdFunc(token, _id) {
  await axios({
    method: 'GET',
    url: urls.USER_BY_ID + _id,
    headers: {
      'authorization': token,
    },
  }).then(res => {
    return res.data.data;
  }).catch(err => {
    console.log('getUserById  Error:', err);
    return null;
  });
}
