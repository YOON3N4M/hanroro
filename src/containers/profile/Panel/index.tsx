import { cn } from "@/utils";
import { motion } from "motion/react";
import { Attributes, HTMLAttributes, ReactNode } from "react";

export interface PanelProps {
  activePanelIndex: number;
  panelIndex: number;
}

export interface PanelTemplateProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isPanelActive: boolean;
}

export const panelVariants = {
  hidden: {
    opacity: 0,
    display: "none",
  },
  visible: {
    opacity: 1,
    display: "block",
    transition: { staggerChildren: 0.3 },
  },
};

export function usePanel(activePanelIndex: number, panelIndex: number) {
  const isPanelActive = activePanelIndex === panelIndex;

  return { isPanelActive };
}

export function PanelTemplate(props: PanelTemplateProps) {
  const { isPanelActive, children, className } = props;

  return (
    <motion.div
      className={cn("absolute size-full", className)}
      variants={panelVariants}
      initial="hidden"
      animate={isPanelActive ? "visible" : "hidden"}
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}
