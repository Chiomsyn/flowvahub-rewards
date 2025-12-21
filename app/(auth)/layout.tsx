import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 p-4">
      {children}
    </div>
  );
};

export default layout;
