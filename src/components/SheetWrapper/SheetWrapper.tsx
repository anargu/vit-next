import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export type SheetWrapperProps = {
  show: boolean,
  onCloseSheet: () => void | undefined,
  children: React.ReactNode | undefined,
};

export const SheetWrapper = (props : SheetWrapperProps) => {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div 
          className="h-[100vh] w-full fixed bottom-0 left-0 right-0 h-full z-50"
        >
          <motion.div
            className="h-full bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              title="close"
              initial={{ top: -50 }}
              animate={{ top: 0 }}
              exit={{ top: -50 }}
              transition={{
                duration: 0.4,
              }}
              onClick={(e) => { e.preventDefault(); props.onCloseSheet?.(); }}
              className="relative cursor-pointer m-4 float-right text-4xl text-white font-thin"
            >&times;</motion.div>
          </motion.div>
          <motion.div
            className="h-auto absolute bottom-0 w-full z-50 bg-white"
            initial={{ bottom: "-100%" }}
            animate={{ bottom: 0, }}
            exit={{ bottom: "-100%" }}
            transition={{
              default: { ease: "easeOut", duration: 0.4 },
            }}
          >
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
