import express from "express";
import logger from "morgan";
import bodyParser from "body-parser"
import * as db from "./srcipt_db.js";

const headerFields = { "Content-Type": "text/html" }; 

async function filter(response,days,category){
    if (days === undefined || category=== undefined) {
        response.writeHead(400, headerFields);
        response.write("<h1>need days and category</h1>");
        response.end(); 
    }
    else{
    try {
        const arr = await db.filterbyCategory(days,category)
        response.writeHead(200, headerFields);
        response.write(JSON,stringify(arr));
        response.end();
      } catch (err) {
        response.writeHead(500, headerFields);
        response.write("<h1>Internal Server Error</h1>");
        response.end();
      }
    }
}







const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client"));
const MethodNotAllowedHandler = async (request, response) => {
    response.status(405).type('text/plain').send('Method Not Allowed');
  }; 

  app.route("/read")
    .post(async (req, res) => {
        const { days, category } = req.query;
        filter(res, days, category);
    })
    .all(MethodNotAllowedHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});