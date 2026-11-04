// En producción hay que definir JWT_SECRET; el valor por defecto solo sirve para desarrollo local.
module.exports = () => process.env.JWT_SECRET || "change-this-development-secret-at-least-32-bytes";
