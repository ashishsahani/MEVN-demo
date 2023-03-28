const clients = require("./modules/clients/clientRouter");
const providers = require("./modules/providers/providerRouter");

module.exports = (app)=>{
    app.use("/api/clients", clients);
    app.use("/api/providers", providers);
}