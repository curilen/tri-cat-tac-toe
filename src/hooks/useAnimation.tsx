import { useEffect, useRef, useState } from 'react';

interface IUseAnimationProps {
  animation: (delta: number) => void;
  maxTime?: number;
  onFinish?: () => void;
}

const useAnimation = ({
  animation,
  maxTime = 2000,
  onFinish,
}: IUseAnimationProps) => {
  const [animate, setAnimate] = useState(false);
  const firstAnimationTime = useRef(0);

  const handleAnimation = (time: number) => {
    if (!animate) {
      return;
    }

    if (firstAnimationTime.current === 0) {
      firstAnimationTime.current = time;
    }
    const delta = Math.round(time - firstAnimationTime.current);
    if (delta > maxTime) {
      firstAnimationTime.current = 0;
      setAnimate(false);
      if (onFinish) {
        onFinish();
      }
      return;
    }

    animation(delta);
    requestAnimationFrame(handleAnimation);
  };

  useEffect(() => {
    if (animate) {
      requestAnimationFrame(handleAnimation);
    }
    // Next line for handleAnimation dependency. Better performance for rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  const startAnimation = () => {
    if (animate) {
      return;
    }

    setAnimate(true);
  };

  return {
    startAnimation,
  };
};

export default useAnimation;
