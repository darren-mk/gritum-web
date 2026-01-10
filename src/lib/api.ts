export function getBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || '';
  }
  return '';
}
