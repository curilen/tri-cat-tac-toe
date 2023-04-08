import { extend as extendThree } from '@react-three/fiber';
import type { Object3DNode } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

export default extendThree({ TextGeometry });
