import DynamicEnvLoader from '../src';

describe('DynamicEnvLoader', () => {
  it('should load environment variables from the correct .env file', () => {
    process.env.NODE_ENV = 'development';
    const envLoader = DynamicEnvLoader.getInstance();

    expect(envLoader.get('TEST_VALUE')).toBe('123123');
    expect(envLoader.get('TEST_VAR', 'fallback')).toBe('fallback');
  });
});