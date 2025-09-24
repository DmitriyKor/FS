import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
    try {        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (err) {
        return null;
    }
}

export const compareHash = async (passwordEntered, hashedPassword) => {
    return await bcrypt.compare(passwordEntered, hashedPassword);
}