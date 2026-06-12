// src/index.ts
var S3MediaLibrary = {
  name: "s3",
  init({ options = {}, handleInsert }) {
    var _a;
    const uploadUrl = (_a = options.upload_url) != null ? _a : "http://localhost:8082/upload";
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    document.body.appendChild(input);
    input.addEventListener("change", async () => {
      var _a2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(uploadUrl, { method: "POST", body: formData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        handleInsert(data.url);
      } catch (err) {
        console.error("S3 upload failed:", err);
        alert(`Upload failed: ${err.message}`);
      }
      input.value = "";
    });
    return {
      show({ imagesOnly } = {}) {
        input.accept = imagesOnly ? "image/*" : "image/*,video/*,.pdf";
        input.click();
      },
      hide() {
      },
      onClearControl() {
      },
      onRemoveControl() {
      },
      enableStandalone() {
        return true;
      }
    };
  }
};
var index_default = S3MediaLibrary;
export {
  index_default as default
};
