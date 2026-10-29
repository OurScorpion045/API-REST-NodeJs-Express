import { rateLimit } from 'express-rate-limit';
import { TooManyRequest } from '../errors/TooManyRequest.js';

export const rateLimiter = (attemptsLimit) => {
    return rateLimit({
        windowMs: 60 * 60 * 1000,
        limit: attemptsLimit,
        handler: (req, res, next) => {
            next(new TooManyRequest("Too many requests"))
        },
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        ipv6Subnet: 56
    })
}