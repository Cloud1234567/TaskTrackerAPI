const axios = require("axios");

async function getToken() {
  const resData = await axios
    .post("http://localhost:3000/login", {
      username: "ohm1",
      password: "1",
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      //   console.log(err);
    });
  const task = await axios
    .get("http://localhost:3000/tasks", {
      headers: {
        Authorization: resData.data.token,
      },
    })
    .then((res) => {
      console.log(res.data);
    });
}
getToken();
