'use strict';

// Beginner: validate required environment variables at startup.
// Advanced: fail fast avoids undefined behavior in production runtime.
function getValidatedConfig(env) {
  const requiredKeys = ['NODE_ENV', 'API_BASE_URL', 'JWT_SECRET'];
  const missing = requiredKeys.filter((key) => !env[key] || env[key].trim() === '');

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }

  return {
    nodeEnv: env.NODE_ENV,
    apiBaseUrl: env.API_BASE_URL,
    jwtSecret: env.JWT_SECRET,
    port: Number(env.PORT ?? 3000)
  };
}

try {
  const config = getValidatedConfig(process.env);
  console.log('Config loaded:', { ...config, jwtSecret: '***' });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
