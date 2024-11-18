import { motion } from "motion/react";
import { Attributes, ReactNode } from "react";

export interface PanelProps {
  activePanelIndex: number;
  panelIndex: number;
}

export interface PanelTemplateProps {
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
  },
};

export function usePanel(activePanelIndex: number, panelIndex: number) {
  const isPanelActive = activePanelIndex === panelIndex;

  return { isPanelActive };
}

export function PanelTemplate(props: PanelTemplateProps) {
  const { isPanelActive, children } = props;

  return (
    <motion.div
      className="absolute size-full"
      variants={panelVariants}
      initial="hidden"
      animate={isPanelActive ? "visible" : "hidden"}
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}
