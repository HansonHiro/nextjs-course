import Link from "next/link";

import classes from "./button.module.css";
function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <span className={classes.btn}>{props.children}</span>
      </Link> //any other way to do it
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
