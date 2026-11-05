import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-white";
type Size = "md" | "lg";

const base = "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 will-change-transform select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 disabled:opacity-50 disabled:pointer-events-none";
const sizes: Record<Size, string> = { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-[15px]" };
const variants: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-dark hover:-translate-y-0.5 shadow-[0_10px_24px_-10px_rgba(232,117,50,0.7)]",
  secondary: "bg-navy text-white hover:bg-navy-soft hover:-translate-y-0.5",
  ghost: "bg-transparent text-navy hover:bg-grey",
  white: "bg-white text-navy hover:bg-grey hover:-translate-y-0.5",
  "outline-white": "border border-white/35 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-sm",
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; className?: string; children: ReactNode };
type LinkProps = Common & { to: string; href?: never; onClick?: never };
type AnchorProps = Common & { href: string; to?: never; target?: string; rel?: string; download?: boolean };
type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };

export default function Button(props: LinkProps | AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", arrow = false, className = "", children } = props;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />}
    </>
  );
  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    const { href, target, rel, download } = props as AnchorProps;
    return (
      <a href={href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} download={download} className={cls}>
        {inner}
      </a>
    );
  }
  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props as ButtonProps;
  return (
    <button type="button" {...rest} className={cls}>
      {inner}
    </button>
  );
}
