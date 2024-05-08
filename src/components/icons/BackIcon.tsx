// icon:arrow-big-left | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function BackIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M20 15h-8v3.586a1 1 0 01-1.707.707l-6.586-6.586a1 1 0 010-1.414l6.586-6.586A1 1 0 0112 5.414V9h8a1 1 0 011 1v4a1 1 0 01-1 1z" />
    </svg>
  );
}

export default BackIcon;
