import React from "react";

interface ShlProps {
  message: string;
}
export const Shl: React.FC<ShlProps> = ({ message }) => <div>{message}</div>;
