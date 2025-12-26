import { Suspense } from "react";
import SignUpComponent from "../_components/signup-component";

const page = () => {
  return (
    <Suspense>
      <SignUpComponent />
    </Suspense>
  );
};

export default page;
