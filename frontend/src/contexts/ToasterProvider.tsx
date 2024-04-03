import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

interface ToasterProviderProps extends PropsWithChildren {}

const ToasterProvider = ({ children }: ToasterProviderProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToasterProvider;
