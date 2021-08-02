const app = require("./app");
// const debug = require("debug")("node-angular");
const http = require("http");


const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const portInUse = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EADDRINUSE":
        console.error(portInUse + " already in use");
        process.exit(1);
        break;  
    case "EACCES":
      console.error(portInUse + " does not have privileges");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = (process.env.PORT || "2000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port,()=>{
    console.log('Application running on localhost:'+port)
});
