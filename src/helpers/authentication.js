
// export default Auth;
import jwt_decode from 'jwt-decode';

const Auth = () => (
  <React.Fragment></React.Fragment>
)

export async function saveToken(token) {
  await localStorage.setItem('accessToken', token)
}

export function getBearerToken() {
  return localStorage.getItem('accessToken');
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
  const token = localStorage.getItem('accessToken');
  if (token != null) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem('accessToken');
      return null;
    } else {
      return decodedToken.data;
    }
  } else
    return null;
}

export default Auth;