function registerHandler(req, res) {
    try {
        return res.send("Hello world!")
    } catch (error) {

    }
}

export { registerHandler }