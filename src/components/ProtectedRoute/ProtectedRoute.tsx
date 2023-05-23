import { Navigate } from "react-router-dom";

function ProtectedRoute(props: any) {
  if (props.user.mail === "") {
    return <Navigate to="/" />;
  }

  return props.children;
}

export default ProtectedRoute;
