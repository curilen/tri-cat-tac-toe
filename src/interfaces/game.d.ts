interface IGameTokens {
  X: string;
  O: string;
}

interface IGamePlayers {
  id: string;
  displayName?: string;
  token?: keyof IGameTokens;
}
