interface IWinnerCheckResult {
  isWinner: boolean;
  winningPosition: number[];
}

export const validateWinner = (
  tokenSelected: Array<keyof IGameTokens | null> = [],
  victoryPatterns: number[][],
  tokenPlayer: keyof IGameTokens
): IWinnerCheckResult => {
  const result: IWinnerCheckResult = {
    isWinner: false,
    winningPosition: [],
  };

  const playerPositions = getPlayerPositions(tokenSelected, tokenPlayer);

  if (victoryPatterns.length < 1 || playerPositions.size < 2) {
    return result;
  }

  // Matriz O(mn)
  for (const subarray of victoryPatterns) {
    let foundAllElements = true;
    for (const element of subarray) {
      // has O(1)
      if (!playerPositions.has(element)) {
        foundAllElements = false;
        break;
      }
    }
    if (foundAllElements) {
      result.isWinner = true;
      result.winningPosition = subarray;
      return result;
    }
  }

  return result;
};

export const getPlayerPositions = (
  tokenSelected: Array<keyof IGameTokens | null> = [],
  tokenPlayer: keyof IGameTokens
): Set<number> => {
  const playerPositions: number[] = [];
  for (let t = 0; t < tokenSelected.length; t++) {
    if (tokenSelected[t] === tokenPlayer) {
      playerPositions.push(t);
    }
  }
  playerPositions.sort();
  return new Set(playerPositions);
};
