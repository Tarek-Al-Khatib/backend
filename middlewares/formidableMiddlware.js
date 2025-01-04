import formidable from "formidable";

const formidableMiddleware = (options = {}) => {
  const form = formidable({
    multiples: options.multiples || true,
    uploadDir: options.uploadDir || "./uploads",
    keepExtensions: options.keepExtensions || true,
    maxFileSize: options.maxFileSize || 5 * 1024 * 1024,
  });
};

export default formidableMiddleware;
