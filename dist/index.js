"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
/**
 * Dynamic Environment Variable Loader
 * Auto-detects the current environment and loads the appropriate .env file.
 */
class DynamicEnvLoader {
    constructor(envFilePath) {
        this.envFilePath = envFilePath || this.getDefaultEnvPath();
        this.loadEnvironmentVariables();
    }
    /**
     * Singleton pattern to ensure only one instance of the loader exists.
     */
    static getInstance(envFilePath) {
        if (!DynamicEnvLoader.instance) {
            DynamicEnvLoader.instance = new DynamicEnvLoader(envFilePath);
        }
        return DynamicEnvLoader.instance;
    }
    /**
     * Gets the default .env file path based on the NODE_ENV variable.
     */
    getDefaultEnvPath() {
        const nodeEnv = process.env.NODE_ENV || 'development';
        const basePath = path_1.default.resolve(__dirname, '..');
        return path_1.default.join(basePath, `.env.${nodeEnv}`);
    }
    /**
     * Loads environment variables from the specified .env file.
     */
    loadEnvironmentVariables() {
        const result = dotenv.config({ path: this.envFilePath });
        if (result.error) {
            console.warn(`Failed to load environment variables from ${this.envFilePath}, Using fallback values.`);
        }
    }
    /**
     * Retrieves an environment variable with optional fallback.
     */
    get(key, fallback) {
        return process.env[key] || fallback || '';
    }
}
exports.default = DynamicEnvLoader;
