import jwt from 'jsonwebtoken'

export function verifyToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    const decoded = jwt.verify(token, secret) as { role: string }
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}