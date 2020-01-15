const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// use express middleware to handle cookies (JWT) ie cookieParser is an express middleware
server.express.use(cookieParser());

// Decode the JWT so as to get user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId into the req for further requests to access
    req.userId = userId;
  }
  next();
});

// TODO use express middleware to populate current user && sample
server.express.use(async (req, res, next) => {
  // If they are not logged in Skip this!
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: { id: req.userId }
    },
    "{ id, permissions, name, email }"
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running 🤓 on port
        http:/localhost:${deets.port}`);
  }
);
