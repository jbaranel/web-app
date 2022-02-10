declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        JWT_SECRET: string;
        AWS_REGION: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_KEY: string;
        AVATAR_BUCKET: string;        
        UPLOAD_AWS_KEY: string;
        UPLOAD_AWS_SECRET: string;        
        DB_URI: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        ENVIRONMENT: string;
      }
    }
  }
  
  export {}