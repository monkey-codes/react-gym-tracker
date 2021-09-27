import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const AuthGuard: React.FC = (props) => {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (!user && !loading) history.replace("/login");
  }, [user, loading, history]);

  return <>{user && !loading && props.children}</>;
};

export default AuthGuard;
