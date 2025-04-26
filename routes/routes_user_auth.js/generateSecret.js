const crypto = require('crypto');

// Generoi 64 merkkiä pitkä satunnainen merkkijono
const secret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET=' + secret); 