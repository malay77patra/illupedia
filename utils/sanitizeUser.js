const _ = require('lodash');

/**
 * Sanitizes the user object by returning only the specified fields.
 * 
 * @param {Object} user - The full user object from the database
 * @param {Array} fields - Array of field names to include in the sanitized object
 * @returns {Object} Sanitized user object with only the specified fields
 */
const sanitizeUser = (user, fields = ['email']) => {
    if (!user) return null;

    // Convert to plain object if Mongoose document
    const userObj = user.toObject ? user.toObject() : user;

    // Return only the selected fields
    return _.pick(userObj, fields);
};

module.exports = sanitizeUser;
