import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";
type IProp = {
  children: ReactNode;
  isWaiting?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
  children,
  isWaiting = false,
  className,
  type,
  onClick,
}: IProp) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("btn btn-primary ", className)}
      disabled={isWaiting}
    >
      {isWaiting && <span className="loading loading-spinner"></span>}{" "}
      {children}
    </button>
  );
}
