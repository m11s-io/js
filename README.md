# m11s JavaScript Packages

[![Publish to npm](https://github.com/m11s-io/js/actions/workflows/publish.yml/badge.svg)](https://github.com/m11s-io/js/actions/workflows/publish.yml)

JavaScript packages maintained by [m11s-io](https://github.com/m11s-io) and published to npm.

## Available Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@m11s-io/s3-upload-proxy`](packages/s3-upload-proxy/README.md) | HTTP upload service for S3-compatible storage, including Amazon S3, Cloudflare R2, and MinIO | [![npm version](https://img.shields.io/npm/v/@m11s-io/s3-upload-proxy)](https://www.npmjs.com/package/@m11s-io/s3-upload-proxy) |
| [`@m11s-io/decap-cms-media-library-s3`](packages/decap-cms-media-library-s3/README.md) | S3-compatible media library for Decap CMS | [![npm version](https://img.shields.io/npm/v/@m11s-io/decap-cms-media-library-s3)](https://www.npmjs.com/package/@m11s-io/decap-cms-media-library-s3) |

## Development

This repository uses Bun workspaces. Install dependencies, then build or test a
package from the repository root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/<package> build
bun run --cwd packages/<package> test
```

Each package also provides a `dev` script for watch builds.

## Publishing

Packages are built with Bun and published to npm by GitHub Actions when a
version tag is pushed. The workflow uses npm's GitHub OIDC trusted publishing
and provenance. Tag names use the package directory followed by the version,
for example `s3-upload-proxy/v0.1.3`. Run the workflow manually to build and
pack a selected package without publishing it.

Package versions are maintained in each package's `package.json`.
