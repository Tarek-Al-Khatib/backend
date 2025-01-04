import { Url } from "url";

export const fullUrl = (req) => {
  return URL.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
};
