# @m11s-io/s3-upload-proxy

[![npm version](https://img.shields.io/npm/v/@m11s-io/s3-upload-proxy)](https://www.npmjs.com/package/@m11s-io/s3-upload-proxy)

HTTP upload service that accepts multipart file uploads and stores them in
S3-compatible storage, including Amazon S3, Cloudflare R2, and MinIO.

## Install

```bash
npm install @m11s-io/s3-upload-proxy
```

## Configure

Set these environment variables before starting the service:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `S3_ENDPOINT` | Yes | — | S3-compatible endpoint URL |
| `S3_ACCESS_KEY` | Yes | — | S3 access key |
| `S3_SECRET_KEY` | Yes | — | S3 secret key |
| `S3_BUCKET` | Yes | — | Bucket where uploaded objects are stored |
| `S3_PUBLIC_URL` | Yes | — | Public base URL used in the response |
| `PORT` | No | `8082` | HTTP listen port |
| `S3_KEY_PREFIX` | No | empty | Prefix added before the tenant and object name |
| `S3_REGION` | No | `us-east-1` | S3 region |

Example:

```bash
S3_ENDPOINT=https://s3.example.com \
S3_ACCESS_KEY=your-access-key \
S3_SECRET_KEY=your-secret-key \
S3_BUCKET=uploads \
S3_PUBLIC_URL=https://cdn.example.com/uploads \
npx s3-upload-proxy
```

## Upload files

Send a multipart form field named `file` to `/upload/:tenant`:

```bash
curl -F 'file=@photo.jpg' http://localhost:8082/upload/example
```

The response contains the public URL of the stored object:

```json
{"url":"https://cdn.example.com/uploads/example/1710000000000-photo.jpg"}
```

The stored key is formed from `S3_KEY_PREFIX`, the tenant, and a timestamped
original filename. The service enables CORS for browser requests.

## Development

From the repository root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/s3-upload-proxy build
bun run --cwd packages/s3-upload-proxy test
```
