declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PROPERTY_ADDRESS: string;
    }
  }
}

export {}
