import passport from "passport";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from "passport-jwt";
import prisma from "../../prisma.config.js";

type Opts = {
    jwtFromRequest: JwtFromRequestFunction,
    secretOrKey: string
}

const opts: Opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET!
}

passport.use(new Strategy(opts, (payload, done) => {
    prisma.user.findFirst({ where: { id: payload.id }, select: {id: true, role: true} }).then((user) => {        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        return done(err, false);
    })
}))

export default passport