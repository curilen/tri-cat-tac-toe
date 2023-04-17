import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';

interface IUseAnimationProps {
  animationFunction: (timeMillis: number) => boolean;
  maxTime?: number;
  autoStopTime?: boolean;
  onFinish?: () => void;
}

const useAnimation = ({
  animationFunction,
  maxTime = 2000,
  onFinish,
}: IUseAnimationProps) => {
  const [animate, setAnimate] = useState(false);
  const firstAnimationTime = useRef(0);
  const { invalidate: requestNewRender } = useThree();

  const startAnimation = () => (!animate ? setAnimate(true) : null);
  const handleFinish = () => {
    if (!animate) {
      return;
    }
    setAnimate(false);
    firstAnimationTime.current = 0;
    if (onFinish) {
      onFinish();
    }
  };

  useFrame(({ clock }) => {
    if (!animate) {
      return;
    }
    if (firstAnimationTime.current === 0) {
      firstAnimationTime.current = clock.elapsedTime * 1000;
    }

    const time = Math.round(
      clock.elapsedTime * 1000 - firstAnimationTime.current
    );
    const continueAnimation = animationFunction(time);

    if (continueAnimation && time < maxTime) {
      requestNewRender();
    } else {
      handleFinish();
    }
  });

  return {
    startAnimation,
  };
};

export default useAnimation;
