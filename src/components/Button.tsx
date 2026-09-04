import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "saffron" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<string, string> = {
  dark: "bg-[#2B2420] text-[#F5EFE3] hover:bg-[#1C1815]",
  saffron: "bg-[#E8A33D] text-[#2B2420] hover:bg-[#C98A28]",
  gold: "bg-[#C9A227] text-[#2B2420] hover:bg-[#B08C1E]",
  outline: "border border-[#D4C8B5] text-[#2B2420] hover:bg-[#F5F0E8] bg-transparent",
  ghost: "text-[#8A7F6E] hover:text-[#2B2420] hover:bg-[#F5F0E8] bg-transparent",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
};

export function Button({
  variant = "dark",
  size = "md",
  children,
  icon,
  iconRight,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
