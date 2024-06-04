import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGY3NzE4NmY2NzhjZDJmZWM5NWRhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODczNTYxOSwiZXhwIjoxNjc4OTk0ODE5fQ.s9PiT4iRKaVe59yPqiz3kiZeFeYrvcktza_D_mpPY6k"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});