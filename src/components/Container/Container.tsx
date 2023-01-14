import React, { DOMElement, ReactComponentElement } from "react";
import s from "./Container.module.scss";

interface IProps {
  children: HTMLAttributes<HTMLDivElement> | HTMLDivElement
}

const Container: React.FC<IProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
