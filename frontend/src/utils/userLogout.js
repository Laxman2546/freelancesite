import axios from "axios";

export const userLogout = () => {
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND_URI}/logout`,
      {},
      { withCredentials: true }
    )
    .then((result) => {
      if (result.status === 201) {
        return result.status;
      } else if (result.status === 500) {
        return result.response.data.error;
      }
    })
    .catch((e) => {
      return e.response.data.error;
    });
};
