module.exports = ({ type = "image/png", encoding = "base64", data}) => {
    return `data:${type};${encoding},${data}`
}