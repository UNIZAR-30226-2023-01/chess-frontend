import { useEffect, useState, useCallback } from 'react';

export function useEnterKey(targetKey, onPress=() => {}) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
      ({key}) => {
        if (key.toLowerCase() === targetKey.toLowerCase()) {
          setKeyPressed(true);
          onPress();
        }
      },
      [targetKey],
  );

  const upHandler = useCallback(
      ({key}) => {
        if (key.toLowerCase() === targetKey.toLowerCase()) setKeyPressed(false);
      },
      [targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}


export default function useKeyPress(targetKey, onPress=() => {}) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
      (event) => {
        if (event.key.toLowerCase() === targetKey.toLowerCase() && event.altKey) {
          setKeyPressed(true);
          onPress();
        }
      },
      [targetKey],
  );

  const upHandler = useCallback(
      (event) => {
        if (event.key.toLowerCase() === targetKey.toLowerCase() && event.altKey) setKeyPressed(false);
      },
      [targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
}
