/* eslint-disable linebreak-style */
import { apiRouter } from "./api-rest/index";
import { clientRouter } from "./client/index";
import express from "express";
import { join } from "path";
import methodOverride from 'method-override';
import { authenDatabaseConnection } from "./database/index";
import cookieParser from 'cookie-parser';


const app = express();

const ROOT_DIR = process.cwd();
const PUBLIC_PATH = join(ROOT_DIR, "public");
const VIEW_PATH = join(ROOT_DIR, "views");

app.use(express.static(PUBLIC_PATH));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser("cookie-secret"))

app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	  // look in urlencoded POST bodies and delete it
	  var method = req.body._method
	  delete req.body._method
	  return method
	}
}))

app.set("view engine", "pug");
app.set("views", VIEW_PATH);

app.get("/user", (req, res) => {
	return res.render("pages/users.pug")
})

app.get("/map", (req, res) => {
	return res.render("pages/map.pug")
});

app.get("/profile", (req, res) => {
	return res.render("pages/profile.pug")
});

app.get("/maps", (req, res) => {
	return res.render("pages/maps.pug")
});

app.get("/icons", (req, res) => {
	return res.render("pages/icons.pug")
});

app.use("/api", apiRouter);
app.use("/", clientRouter);

authenDatabaseConnection();

app.listen(process.env.PORT || 3000);