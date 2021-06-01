import axios from "axios";

export const verifyPostCode = async (postCode) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://postcodes.io/postcodes/' + postCode,
    });
    if (response.data.status === 200)
      return true;
    else
      return false;
  } catch (error) {
    return false;
  }
}