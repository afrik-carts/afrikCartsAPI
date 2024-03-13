
import express from "express";
import cors from "cors"
import v1Routes from "./v1/routes/index.js"
import passport from "passport";

const app = express()
export const PORT = process.env.PORT || 5001

// set cors headers
app.use(cors())

// remove all json null response value
app.set('json replacer', (k:any, v:any) => (v === null ? undefined : v))

// parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())

// register route
app.use("/api/v1", v1Routes)

export default app
