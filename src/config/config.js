import dotenv from 'dotenv'

dotenv.config()

const CONFIG={
    PORT: +process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || ''
}
export default CONFIG