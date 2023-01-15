import React, { DOMElement, ReactComponentElement } from "react";
import s from "./Container.module.scss";

// interface IProps {
//   children: HTMLAttributes<HTMLDivElement> | HTMLDivElement
// }

const Container: React.FC = () => {
  return <div className={s.container}></div>;
};

export default Container;
