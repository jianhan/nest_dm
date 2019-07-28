import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validate(config);
  }

  private validate(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      // Mongo
      MONGO_HOST: Joi.string().default('localhost'),
      MONGO_PORT: Joi.number().default(27017),
      MONGO_DB: Joi.string().default('nestjs_dm'),
      APP_PORT: Joi.number().default(8007),
      // JWT
      JWT_SECRET: Joi.string().regex(/^[a-zA-Z0-9]{10,40}$/),
      // Github
      GITHUB_CLIENT_ID: Joi.string().required(),
      GITHUB_CLIENT_SECRET: Joi.string().required(),
      GITHUB_CALLBACK_URL: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

export const getConfigService = (): ConfigService => {
  return new ConfigService(`${process.env.NODE_ENV}.env`);
};
