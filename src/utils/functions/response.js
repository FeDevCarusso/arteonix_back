export default function response(res, status, message, error, data) {
    return res.status(status).json({
        status,
        message,
        error,
        data
    })
}