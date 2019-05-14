import { useLayoutEffect } from 'react';

export default function useKeyboard(code, { isAlt }, cb) {
  useLayoutEffect(() => {
    const listener = evt => {
      const alt = isAlt ? evt.altKey : true;

      if (alt && evt.code === code) {
        cb();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [cb, code, isAlt]);
}
