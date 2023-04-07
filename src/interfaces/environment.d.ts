declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GAME_DEFAULT_LOCALE: string;
    }
  }
}

export {};
