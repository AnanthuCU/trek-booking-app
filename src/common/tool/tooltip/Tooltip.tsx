"use client";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Tooltip = ({ children }: Props) => {
  useEffect(() => {}, []);

  return <div>{children}</div>;
};

export default Tooltip;
