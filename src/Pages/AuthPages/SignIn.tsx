
import AuthLayout from "./AuthPageLayout";

import Login from "../Auth/Firebase-Auth/Login";

export default function SignIn() {
  return (
    <div>
      <AuthLayout>
        <Login/>
      </AuthLayout>
    </div>
  );
}
