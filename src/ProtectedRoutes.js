import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  // const [isAuth, setIsAuth] = useState(false);

  const isAuthCheck = localStorage.getItem("token");

  return isAuthCheck === null ? false : true;

  //   useEffect(() => {
  //     // if (isAuthCheck === null) {
  //     //   setIsAuth(false);
  //     //   console.log("in if", isAuth);
  //     // }
  //     // console.log(isAuth);
  //   });

  //   console.log(isAuth);

  //   const user = { loggedIn: isAuth };
  //   return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  // console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
