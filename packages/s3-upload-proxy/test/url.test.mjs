import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPublicUrl } from '../dist/url.js';

test('encodes S3 key path segments for use in Markdown URLs', () => {
  assert.equal(
    buildPublicUrl(
      'https://minio.example.test/bucket/',
      'decap/m11s/123-Screenshot 2026-05-19 at 20.26.49.png',
    ),
    'https://minio.example.test/bucket/decap/m11s/123-Screenshot%202026-05-19%20at%2020.26.49.png',
  );
});

test('encodes reserved characters without encoding key separators', () => {
  assert.equal(
    buildPublicUrl('https://example.test/bucket', 'tenant/a #1?.png'),
    'https://example.test/bucket/tenant/a%20%231%3F.png',
  );
});
