// Performance monitoring utility
export const reportWebVitals = (metric) => {
  if (metric.label === 'web-vital') {
    console.log(`${metric.name}: ${metric.value}`);
  }
};

// Optimize images
export const getOptimizedImageUrl = (url, width) => {
  return `${url}?w=${width}&q=80`;
};
