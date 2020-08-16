import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    login @client {
      isLoggedIn
      refreshRequestHasFinished
    }
  }
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [getIsLoggedIn, { data, called, loading }] = useLazyQuery<{
    login: { isLoggedIn: boolean; refreshRequestHasFinished: boolean };
  }>(IS_USER_LOGGED_IN);

  useEffect(() => {
    getIsLoggedIn();
  }, []);

//   if (!data?.login.isLoggedIn) return <Redirect to="/login" />;
//   return <div>{children}</div>;

  if(!data?.login.refreshRequestHasFinished) return <p>Loading...</p>
  if(data?.login.refreshRequestHasFinished && !data?.login.isLoggedIn) return <Redirect to="/login" />

  return (
      <div>
          { children }
      </div>
  )
};

export default ProtectedRoute;
