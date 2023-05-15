import React, {useState, useRef, useEffect, useCallback} from 'react';

export default function CountUp({start = 0, end, timer = 50, symbol}) {
  const [state, setState] = useState(null);
  const ref = useRef(start);

  const accumulator = end / 200;

  const updateCounterState = useCallback(() => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accumulator);
      if (result > end) return setState(end);
      setState(result);
      ref.current = result;
    }
    setTimeout(updateCounterState, timer);
  }, [end, ref, setState, accumulator, timer]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) updateCounterState();
    return () => (isMounted = false);
  }, [start, end]);

  return (
    <div>{state + symbol}</div>
  );
}
