export const useAppleLogin = () => {
    const config = {
        client_id: 'answerlog', // This is the service ID we created.
        redirect_uri: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI as string, // As registered along with our service ID
        response_type: 'code id_token',
        response_mode: 'fragment',
        m: 11,
        v: '1.5.4',
    };

    const queryString = Object.entries(config)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    return () =>
        (location.href = `https://appleid.apple.com/auth/authorize?${queryString}`);
};
