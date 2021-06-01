import * as JWT from 'jsonwebtoken'

const authRequired = (req, res, next) => {
    const authHeader =
        req.headers['Authorization'] || req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // Return un-authorized status
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    JWT.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            console.error(err)
            return res.status(401).json({ message: 'Unauthorized' })
        }

        req.user = user
        next()
    })
}

export default authRequired
