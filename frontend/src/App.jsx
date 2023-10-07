import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
        });
    };
    getUser();
  }, []);

  const logout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };

  return (
    <>
      {user ? (
        <div>
          Hello user... <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button
          className="bg-slate-500 px-10 py-2 border-0"
          onClick={() => {
            window.open("http://localhost:8000/auth/google", "_self");
          }}
        >
          Login with google
        </button>
      )}
    </>
  );
}

export default App;
