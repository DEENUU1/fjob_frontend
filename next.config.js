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
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
}

module.exports = nextConfig
