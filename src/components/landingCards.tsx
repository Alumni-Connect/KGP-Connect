import * as React from "react";
import { motion } from "framer-motion";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative z-10 p-6 md:p-8 ${className}`}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-bold text-gray-900 md:text-3xl ${className}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
