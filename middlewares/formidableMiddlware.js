import formidable from "formidable";

const formidableMiddleware = (options = {}) => {
  const form = formidable({
    multiples: options.multiples || true,
    uploadDir: options.uploadDir || "./uploads",
    keepExtensions: options.keepExtensions || true,
    maxFileSize: options.maxFileSize || 10 * 1024 * 1024,
  });

  return (req, res, next) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error in formidable parse:", err);
        return res.status(400).json({ error: "Invalid form data" });
      }

      req.body = fields;
      req.files = files;

      next();
    });
  };
};

export default formidableMiddleware;
