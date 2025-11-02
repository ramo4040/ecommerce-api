import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import "./style.css";

type CustomAccordionProps = {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
};

export function CustomAccordion({
  items,
  type = "single",
  collapsible = true,
  className,
  ...props
}: CustomAccordionProps) {
  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      className={cn("custom-accordion", className)}
      {...props}
    >
      {items.map((item, i) => (
        <AccordionItem key={i} value={item.title}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CustomAccordion;
