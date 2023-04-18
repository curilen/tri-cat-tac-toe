interface IGameTokens {
  X: string;
  O: string;
}

interface IGamePlayers {
  id: string;
  displayName?: string;
  token?: keyof IGameTokens;
  won: number;
}

interface IGameTokenElement {
  order: number;
  position: import('three').Vector3;
  rotation?: import('three').Euler;
}

interface IGameTokenRef {
  callOnClick: () => void;
}
