export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))

  if (obj) {
    return { authorization: obj }
  } else {
    return {}
  }
}
