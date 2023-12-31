/** @type {import('next').NextConfig} */
const nextConfig = {
    "env": {
        "WORK_MODE": process.env.WORK_MODE,
        "API_URL": process.env.API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.eclosio.ong',
            },
            {
                protocol: 'https',
                hostname: 'fjobgeneral.s3.amazonaws.com',
            }
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
