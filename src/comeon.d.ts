export {};

declare global {
  interface Window {
    comeon?: {
      game: {
        launch(code: string): void;
      };
    };
  }
}
