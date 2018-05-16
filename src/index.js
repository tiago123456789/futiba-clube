const app =  require("./config/Server");
require("./config/LoaderConfiguration");

app.listen(process.env.PORT, () => console.log("Server running!!!"));