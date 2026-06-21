export function buildPublicUrl(publicUrl: string, key: string): string {
  const encodedKey = key
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');

  return `${publicUrl.replace(/\/+$/, '')}/${encodedKey}`;
}
