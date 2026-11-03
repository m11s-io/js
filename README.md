# m11s JavaScript Packages

[![Publish to npm](https://github.com/m11s-io/js/actions/workflows/publish.yml/badge.svg)](https://github.com/m11s-io/js/actions/workflows/publish.yml)

JavaScript packages maintained by [m11s-io](https://github.com/m11s-io), published to npm.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@m11s-io/s3-upload-proxy`](https://www.npmjs.com/package/@m11s-io/s3-upload-proxy) | HTTP upload service that stores files in S3-compatible storage, including S3 and MinIO | ![npm version](https://img.shields.io/npm/v/@m11s-io/s3-upload-proxy) |
| [`@m11s-io/decap-cms-media-library-s3`](https://www.npmjs.com/package/@m11s-io/decap-cms-media-library-s3) | Decap CMS media library plugin that uploads files through an upload endpoint | ![npm version](https://img.shields.io/npm/v/@m11s-io/decap-cms-media-library-s3) |

## Quick Start

Install a package in the project that uses it:

```bash
npm install @m11s-io/s3-upload-proxy
npm install @m11s-io/decap-cms-media-library-s3
```

Run the upload proxy with the required S3 settings:

```bash
S3_ENDPOINT=https://s3.example.com \
S3_ACCESS_KEY=your-access-key \
S3_SECRET_KEY=your-secret-key \
S3_BUCKET=uploads \
S3_PUBLIC_URL=https://cdn.example.com/uploads \
npx s3-upload-proxy
```

The service listens on port `8082` by default. Set `PORT` to change it. Upload a
multipart form field named `file` to `/upload/:tenant`; the response contains
the public URL of the stored file:

```bash
curl -F 'file=@photo.jpg' http://localhost:8082/upload/example
```

The optional `S3_KEY_PREFIX` sets a prefix for stored object keys, and
`S3_REGION` defaults to `us-east-1`.

## Decap CMS

Install `@m11s-io/decap-cms-media-library-s3` and register it as the CMS media
library. Set `upload_url` to the proxy upload endpoint for the tenant:

```yaml
media_library:
  name: s3
  config:
    upload_url: https://uploads.example.com/upload/example
```

The plugin sends the selected file as `file` and inserts the returned `url` into
Decap CMS. The upload proxy enables CORS for browser requests.

## Development

This repository uses Bun workspaces. Install dependencies from the repository
root, then build or test an individual package:

```bash
bun install --frozen-lockfile
bun run --cwd packages/s3-upload-proxy build
bun run --cwd packages/s3-upload-proxy test
bun run --cwd packages/decap-cms-media-library-s3 build
bun run --cwd packages/decap-cms-media-library-s3 test
```

Each package also provides `bun run --cwd packages/<package> dev` to rebuild
when source files change.

## Publishing

Packages are built with Bun and published to npm by GitHub Actions when a
version tag is pushed. The workflow publishes with npm's GitHub OIDC trusted
publishing and provenance. Tag names use the package directory followed by the
version, for example `s3-upload-proxy/v0.1.3` or
`decap-cms-media-library-s3/v0.1.7`. Run the workflow manually to build and
pack a selected package without publishing it.
Package versions are maintained in each package's `package.json`.
