//Verificar token

const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

}

//Verificar AdminRole

let verificarAdminRole = (req, res, next) => {
    {
        let usuario = req.usuario;

        if (usuario.role === 'ADMIN_ROLE') {
            next();
        } else {
            res.json({
                ok: false,
                error: {
                    message: 'El usuario no es administrador'
                }
            });
        }


    }
}


module.exports = {
    verificarToken,
    verificarAdminRole
}