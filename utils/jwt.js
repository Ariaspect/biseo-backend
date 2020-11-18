import jwt from 'jsonwebtoken';

export const jwtSign = (user, isAdmin, jwtSecret) =>
    jwt.sign(
        {
            uid: user.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            sparcs_id: user.sparcs_id,
            admin: isAdmin
        },
        jwtSecret,
        {
            expiresIn: '60d'
        }
    );
