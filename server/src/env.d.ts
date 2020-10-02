declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    EMAILUSER: string;
    EMAILPASS: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
  }
}
