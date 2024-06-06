export default function response(res, status, message, error, data, done) {
  return res.status(status).json({
    message,
    error,
    data,
    done,
  });
}
