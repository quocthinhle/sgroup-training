export function profileResponse(profile, accessToken) {
    return {
        accessToken,
        ...profile
    };
}
