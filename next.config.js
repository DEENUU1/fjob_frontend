/** @type {import('next').NextConfig} */
const nextConfig = {
    "env": {
        "WORK_MODE": process.env.WORK_MODE,
        "API_URL": process.env.API_URL,
    }
}

module.exports = nextConfig
