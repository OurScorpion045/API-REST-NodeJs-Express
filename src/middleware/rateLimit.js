import { rateLimit } from 'express-rate-limit';

export const rateLimit = (req, res, next) => {
    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000,
        limit: 10,
        handler: (req, res, next) => {
            next(new TooManyRequest("Too many requests"));
        },
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        ipv6Subnet: 56
    })
}