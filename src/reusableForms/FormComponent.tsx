import React from "react";

type FormComponentProps = {
  children: React.ReactNode;
};

export const FormComponent: React.FC<FormComponentProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};
