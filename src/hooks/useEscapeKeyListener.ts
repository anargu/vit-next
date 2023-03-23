import { useEffect } from 'react';

const useKeyUpListener = (keyString : string, callback: (arg0: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyUp = (event : KeyboardEvent) => {
      if (event.key === keyString) {
        callback(event);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [callback]);
};

export default useKeyUpListener;

