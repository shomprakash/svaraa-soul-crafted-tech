import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "gold" };

export function Button({ className, variant = "primary", ...props }: Props) {
  return <button className={cn("svaraa-button", `svaraa-button-${variant}`, className)} {...props} />;
}