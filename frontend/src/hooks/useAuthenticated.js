const useAuthenticated = () => {
  const localData = localStorage.getItem("user");
  const loggedIn = localData ? true : false;
  const userDetails = JSON.parse(localData);

  return { loggedIn, userDetails };
};

export default useAuthenticated;
