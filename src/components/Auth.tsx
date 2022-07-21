import type { authObject } from "../services/interfaces";

//this function sends a get request to our server to assess wether user is authenticated or not
async function Auth(): Promise<authObject> {
  const url: string = `${process.env.REACT_APP_SERVER}/auth`;
  const response: Response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const responseJson: authObject = await response.json();
  return responseJson;
}

export default Auth;
