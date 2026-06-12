interface Config {
  upload_url?: string;
}

interface InitArgs {
  config?: Config;
  handleInsert: (url: string) => void;
}

interface Instance {
  show: (args?: { imagesOnly?: boolean }) => void;
  hide: () => void;
  onClearControl: () => void;
  onRemoveControl: () => void;
  enableStandalone: () => boolean;
}

const S3MediaLibrary = {
  name: 's3',

  init({ config = {}, handleInsert }: InitArgs): Instance {
    const uploadUrl = config.upload_url ?? 'http://localhost:8082/upload';

    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(uploadUrl, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        handleInsert(data.url);
      } catch (err) {
        console.error('S3 upload failed:', err);
        alert(`Upload failed: ${(err as Error).message}`);
      }

      input.value = '';
    });

    return {
      show({ imagesOnly } = {}) {
        input.accept = imagesOnly ? 'image/*' : 'image/*,video/*,.pdf';
        input.click();
      },
      hide() {},
      onClearControl() {},
      onRemoveControl() {},
      enableStandalone() {
        return true;
      },
    };
  },
};

export default S3MediaLibrary;
