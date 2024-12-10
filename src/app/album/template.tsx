"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AlbumTemplateProps {
  children: ReactNode;
}

function AlbumTemplate(props: AlbumTemplateProps) {
  const { children } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      {children}
    </motion.div>
  );
}

export default AlbumTemplate;
