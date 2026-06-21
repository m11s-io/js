import assert from 'node:assert/strict';
import test from 'node:test';

import S3MediaLibrary from '../dist/index.mjs';

function installDocumentStub() {
  const input = {
    addEventListener() {},
    click() {},
    files: [],
    style: {},
  };

  globalThis.document = {
    body: {
      appendChild(element) {
        assert.equal(element, input);
      },
    },
    createElement(tagName) {
      assert.equal(tagName, 'input');
      return input;
    },
  };

  return input;
}

test('reads upload_url from the Decap media library options', () => {
  const input = installDocumentStub();

  const instance = S3MediaLibrary.init({
    options: {
      name: 's3',
      config: {
        upload_url: 'http://localhost:8082/upload',
      },
    },
    handleInsert() {},
  });

  instance.show({ imagesOnly: true });

  assert.equal(input.accept, 'image/*');
});

test('fails clearly when media_library.config.upload_url is missing', () => {
  installDocumentStub();

  assert.throws(
    () => S3MediaLibrary.init({ options: { name: 's3' }, handleInsert() {} }),
    /upload_url is required in media_library\.config/,
  );
});
