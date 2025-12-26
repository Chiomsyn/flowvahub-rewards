import { Suspense } from "react";
import LoginComponent from "../_components/login-component";

const page = () => {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
};

export default page;
