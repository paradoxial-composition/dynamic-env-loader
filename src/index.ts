import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Dynamic Environment Variable Loader
 * Auto-detects the current environment and loads the appropriate .env file.
 */
export default class DynamicEnvLoader {
  private static instance: DynamicEnvLoader;
  private envFilePath: string;

  private constructor(envFilePath?: string) {
    this.envFilePath = envFilePath || this.getDefaultEnvPath();
    this.loadEnvironmentVariables();
  }

  /**
   * Singleton pattern to ensure only one instance of the loader exists.
   */
  public static getInstance(envFilePath?: string): DynamicEnvLoader {
    if (!DynamicEnvLoader.instance) {
      DynamicEnvLoader.instance = new DynamicEnvLoader(envFilePath);
    }
    return DynamicEnvLoader.instance;
  }

  /**
   * Gets the default .env file path based on the NODE_ENV variable.
   */
  private getDefaultEnvPath(): string {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const basePath = path.resolve(__dirname, '..');
    return path.join(basePath, `.env.${nodeEnv}`);
  }

  /**
   * Loads environment variables from the specified .env file.
   */
  private loadEnvironmentVariables(): void {
    const result = dotenv.config({ path: this.envFilePath });

    if (result.error) {
      console.warn(`Failed to load environment variables from ${this.envFilePath}. Using fallback values.`);
    }
  }

  /**
   * Retrieves an environment variable with optional fallback.
   */
  public get(key: string, fallback?: string): string {
    return process.env[key] || fallback || '';
  }
}