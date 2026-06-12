"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
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
