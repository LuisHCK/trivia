import * as bcrypt from 'bcrypt'
import UserModel from '../../models/user'
import JWT from 'jsonwebtoken'

const SALT_ROUNDS = 10

/**
 * Login euser
 * @param {Request} req
 * @param {Response} res
 */
const login = async (req, res) => {
    const { username, password } = req.body

    try {
        // Find user
        const user = await UserModel.findOne({
            username,
        })

        if (await validPassword(user, password)) {
            // If user exists send token
            const token = await generateWebToken({
                id: user._id,
                username: user.username,
                name: user.name,
            })
            res.status(201).json({ token })
        } else {
            res.status(422).json({ message: 'Invalid credentials' })
        }
    } catch (loginError) {
        console.log(loginError)
        res.status(422).json(loginError)
    }
}

/**
 * Register a new user
 * @param {Request} req
 * @param {Response} res
 */
const signUp = async (req, res) => {
    const { username, password, name } = req.body

    if (!username || !password || !name) {
        return res
            .status(422)
            .json({ message: 'Please fill all required fields' })
    }

    try {
        const passwordDigest = await hashPassword(password)
        const user = await UserModel.create({ name, username, passwordDigest })
        const token = await generateWebToken({
            id: user._id,
            username: user.username,
            name: user.name,
        })
        res.status(201).json({ token })
    } catch (signUpError) {
        console.log(signUpError)
        res.status(422).json(signUpError)
    }
}

/**
 * Get hash from plain text password
 * @param {string} plainTextPwd Plain text password
 * @returns {string} Hashed string
 */
const hashPassword = async (plainTextPwd) => {
    const pwdHash = await bcrypt.hash(plainTextPwd, SALT_ROUNDS)
    return pwdHash
}

/**
 * Generate a signed JWT token
 * @param {{id: string, username: string, name: string}} user
 * @returns {string} Signed JWToken
 */
const generateWebToken = (user) => {
    return JWT.sign({ ...user }, process.env.SECRET, { expiresIn: '7d' })
}

const validPassword = async (user, plainTextPwd) => {
    if (user) {
        return await bcrypt.compare(plainTextPwd, user.passwordDigest)
    }

    return false
}

export default { login, signUp }
