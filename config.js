
// must be in milliseconds
const MAX_REFRESH_TOKEN_AGE = 1000 * 60 * 60 * 24 * 15; // 15 days
const MAX_ACCESS_TOKEN_AGE = 1000 * 60 * 15; // 15 mins

const REFRESH_TOKEN_OPTIONS = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: MAX_REFRESH_TOKEN_AGE
}



module.exports = {
    MAX_REFRESH_TOKEN_AGE,
    MAX_ACCESS_TOKEN_AGE,
    REFRESH_TOKEN_OPTIONS,
};