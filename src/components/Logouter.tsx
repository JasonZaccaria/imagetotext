//function below logs user out
async function logouter(): Promise<void> {
  const response: Response = await fetch(
    `${process.env.REACT_APP_SERVER}/logout`,
    {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
}

export default logouter;
