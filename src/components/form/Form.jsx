import { useState } from "react";
import "./style.css";
import cn from "classnames";


export const Form = ({ submitForm, children, title, classNames }) => {
  return (
    <>
      <form onSubmit={submitForm} className={cn("form", `${classNames && ''}`)}>
        <h1 className="form__title">{title}</h1>
        {children}
      </form>
    </>
  );
};