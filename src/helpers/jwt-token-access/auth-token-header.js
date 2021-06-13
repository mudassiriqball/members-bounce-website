export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("accessToken"))

  if (obj) {
    return { authorization: obj }
  } else {
    return {}
  }
}
