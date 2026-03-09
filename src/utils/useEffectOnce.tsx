import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

const useEffectOnce = (effect: EffectCallback, dependencies: DependencyList = []) => {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      return effect();
    }
  }, dependencies);
};

export default useEffectOnce;
