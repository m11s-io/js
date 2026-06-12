#!/usr/bin/env node
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const {
  S3_ENDPOINT,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET,
  S3_PUBLIC_URL,
  S3_KEY_PREFIX = '',
  S3_REGION = 'us-east-1',
  PORT = '8082',
} = process.env;

if (!S3_ENDPOINT || !S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_BUCKET || !S3_PUBLIC_URL) {
  console.error('Missing required env: S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET, S3_PUBLIC_URL');
  process.exit(1);
}

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: { accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY },
  forcePathStyle: true,
});

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload/:tenant?', upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  const { originalname, buffer, mimetype } = req.file;
  const tenant = req.params.tenant;
  const prefix = [S3_KEY_PREFIX, tenant].filter(Boolean).join('/');
  const key = `${prefix ? prefix + '/' : ''}${Date.now()}-${originalname}`;

  try {
    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    }));
    res.json({ url: `${S3_PUBLIC_URL}/${key}` });
  } catch (err) {
    console.error('Upload error:', (err as Error).message);
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(Number(PORT), () =>
  console.log(`s3-upload-proxy listening on port ${PORT}`),
);
