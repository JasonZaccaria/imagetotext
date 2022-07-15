//function below logs user out
async function logouter() {
  const response = await fetch("http://127.0.0.1:8000/logout", {
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export default logouter;
