
// export default Auth;
import jwt_decode from 'jwt-decode';
// import Router from 'next/router';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlzX2RlbGV0ZWQiOjAsIl9pZCI6IjVmZGNlZDQ3MDljMWQ4MGM3YzMwNzYyZiIsIm1vYmlsZSI6Iis5MjM0MjE1NTYwMjgiLCJmdWxsTmFtZSI6Ik11ZGFzc2lyIElxYmFsIiwiZW1haWwiOiJhZmdoYW5kYXJtYWx0b29uQGdtYWlsLmNvbSIsImNpdHkiOiJJc2xhbWFiYWQiLCJyb2xlIjoiYWRtaW4iLCJhZGRyZXNzIjoiSXNsYW1pYyBVbml2ZXJzaXR5IElzbGFtYWJhZCIsImxpY2Vuc2VObyI6IjEyMzQ1Njc4OTAiLCJlbnRyeV9kYXRlIjoiMjAyMC0xMi0xOFQxNzo1NjoyMy4wODlaIiwic3RhdHVzIjoiYXBwcm92ZWQiLCJfX3YiOjB9LCJyb2xlIjoiVXNlciIsImlhdCI6MTYwODMxNzcyNywiZXhwIjoxNjA4OTIyNTI3fQ.FR5xU7WTsU377G-9vAs0tWvk3uuaRIXlOGbst5rmfUM';

const Auth = () => (
  <React.Fragment></React.Fragment>
)

export async function saveToken(token) {
  await localStorage.setItem('authUser', token)
}

export function getBearerToken() {
  return localStorage.getItem('authUser');
}

export async function clearStorage() {
  try {
    await localStorage.clear();
    return true
  } catch (err) {
    return false
  }
}

export function getDecodedToken() {
  const token = localStorage.getItem('authUser');
  if (token != null) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem('authUser')
      return null;
    } else {
      return decodedToken.data;
    }
  } else
    return null;
}

export default Auth;