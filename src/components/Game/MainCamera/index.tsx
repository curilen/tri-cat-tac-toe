import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

const frustumSize = 20;

function MainCamera() {
  const { size } = useThree();
  const aspect = useMemo(() => size.width / size.height, [size]);
  const frustumWidth = useMemo(() => frustumSize * aspect, [aspect]);

  return (
    <OrthographicCamera
      makeDefault
      left={-frustumWidth / 2}
      right={frustumWidth / 2}
      top={frustumSize / 2}
      bottom={-frustumSize / 2}
      near={0.1}
      far={500}
      position={[0, 0, 10]}
    />
  );
}

export default MainCamera;
