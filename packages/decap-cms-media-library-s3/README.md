# @m11s-io/decap-cms-media-library-s3

[![npm version](https://img.shields.io/npm/v/@m11s-io/decap-cms-media-library-s3)](https://www.npmjs.com/package/@m11s-io/decap-cms-media-library-s3)

S3-compatible media library plugin for Decap CMS. The plugin uploads selected
files to an HTTP upload endpoint and inserts the returned public URL into the
CMS.

## Install

```bash
npm install @m11s-io/decap-cms-media-library-s3
```

## Register the media library

Import the package in the Decap CMS initialization script and register it:

```js
import CMS from 'decap-cms-app';
import S3MediaLibrary from '@m11s-io/decap-cms-media-library-s3';

CMS.registerMediaLibrary(S3MediaLibrary);
```

Configure `upload_url` in the Decap CMS configuration. It should point to the
upload endpoint for the tenant:

```yaml
media_library:
  name: s3
  config:
    upload_url: https://uploads.example.com/upload/example
```

The plugin posts the selected file as the multipart field `file` and expects a
JSON response with a `url` property, for example:

```json
{"url":"https://cdn.example.com/uploads/example/photo.jpg"}
```

## Development

From the repository root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/decap-cms-media-library-s3 build
bun run --cwd packages/decap-cms-media-library-s3 test
```
