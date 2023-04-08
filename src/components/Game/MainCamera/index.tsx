import { forwardRef } from 'react';
import type { Camera } from 'three/src/cameras/Camera';
import { PerspectiveCamera } from '@react-three/drei';
import { CAMERA_DEFAULT_POSITION } from '@/constants/positions';

const MainCamera = forwardRef<Camera | null, unknown>(function (_, cameraRef) {
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={CAMERA_DEFAULT_POSITION}
      //near={0.1}
      //far={50}
      aspect={window.innerWidth / window.innerHeight}
    />
  );
});

MainCamera.displayName = 'MainCamera';
export default MainCamera;
