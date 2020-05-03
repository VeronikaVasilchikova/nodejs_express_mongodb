const express = require("express");
const exphbs = require("express-handlebars");
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const MONGODB_URI = `mongodb://root:u8bh7K9KigFUrA-@cluster0-shard-00-00-oekxw.mongodb.net:27017,cluster0-shard-00-01-oekxw.mongodb.net:27017,cluster0-shard-00-02-oekxw.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
const hbs = exphbs.create({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(_handlebars)
});
const store = new MongoStore({
    collection: "sessions",
    uri: MONGODB_URI
});
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRouter);
app.use("/courses", coursesRouter);
app.use("/add", addRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);
app.use(cors());

const port = process.env.port || 3000;
async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}

start();


