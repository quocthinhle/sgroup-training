export function jwtPayload(id, roles) {
    return {
        id,
        roles,
    };
}
