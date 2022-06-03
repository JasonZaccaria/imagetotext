//this function sends a get request to our server to assess wether user is authenticated or not
async function Auth() {
  const url = "http://127.0.0.1:8000/auth";
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const responseJson = await response.json();
  return responseJson;
}

export default Auth;
