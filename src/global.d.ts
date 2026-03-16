declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
    unauthorized: CustomEvent;
  }
}

export {};
