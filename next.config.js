/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: process.env.API_SOURCE_URL,
                destination: process.env.API_DESTINATION_URL,
            },
        ];
    },
    images: {
        domains: [
            'static.younicorn.poligon.io',
            'younicorn-public-data-storage.s3.ap-northeast-2.amazonaws.com',
            `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
            `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
            'qollabs-content-images.s3.ap-northeast-2.amazonaws.com',
        ],
    },
};
