import React from 'react';

export type SheetWrapperProps = {
  show: boolean,
  onCloseSheet: () => void | undefined,
  children: React.ReactNode | undefined,
};

export const SheetWrapper = (props : SheetWrapperProps) => {
  if (!props.show) return null;

  return (
    <div className="h-[100vh] w-full fixed bottom-0 left-0 right-0 h-full z-50">
      <div className="h-full bg-black/70 z-40">
        <div
          title="close"
          onClick={() => props.onCloseSheet?.()}
          className="cursor-pointer m-4 float-right text-4xl text-white font-thin"
        >&times;</div>
      </div>
      <div className="h-auto absolute bottom-0 w-full z-50 bg-white">
        {props.children}
      </div>
    </div>
  );
};
