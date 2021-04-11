import Link from "next/link";

import classes from "./buttons.module.css";

function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        {/* by default Link will create an anchor tag and apply attributes to the a tag, if we want to apply classNames we have to add an a tag manually */}
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
