import { Navigate } from "react-router-dom";
import useAuthenticated from "../hooks/useAuthenticated";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuthenticated();

  // if (!loggedIn) {
  //   return <Navigate to="/" />;
  // }
  return children;
};

export default ProtectedRoute;
