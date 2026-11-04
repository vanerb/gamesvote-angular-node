const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtSecret");

function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Token requerido" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], jwtSecret());
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido" });
    }
}

module.exports = authMiddleware;
