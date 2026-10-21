import { useEffect, useState } from 'react';

/**
 * Types each word, holds it, deletes it, then types the next — forever.
 * Starts with the first word fully typed so the page is complete at rest.
 * Reduced motion: the words simply swap every few seconds.
 */
export default function useTypeCycle(words, { type = 85, erase = 40, hold = 2600, gap = 350, startDelay = 2600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = 0;
    let i = 0;
    let n = words[0].length;
    let mode = 'hold';

    if (reduce) {
      const id = setInterval(() => {
        i = (i + 1) % words.length;
        setIndex(i);
        setText(words[i]);
      }, hold + 1200);
      return () => clearInterval(id);
    }

    const step = () => {
      const word = words[i];
      if (mode === 'hold') {
        mode = 'erase';
        setTyping(true);
        timer = setTimeout(step, erase);
      } else if (mode === 'erase') {
        n -= 1;
        setText(word.slice(0, Math.max(0, n)));
        if (n <= 0) {
          mode = 'type';
          i = (i + 1) % words.length;
          setIndex(i);
          timer = setTimeout(step, gap);
        } else timer = setTimeout(step, erase);
      } else {
        n += 1;
        const next = words[i];
        setText(next.slice(0, n));
        if (n >= next.length) {
          mode = 'hold';
          setTyping(false);
          timer = setTimeout(step, hold);
        } else timer = setTimeout(step, type + (next[n - 1] === ' ' ? 60 : 0));
      }
    };
    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { index, text, typing };
}
