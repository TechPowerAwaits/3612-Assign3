const express = require("express");
const app = express();

const apiPath = "api";
const dataHandler = require("./scripts/generic-data.js");

dataHandler.setDataRoutes(app, apiPath);
const data = dataHandler.data;

app.get(`/${apiPath}/teapot`, (req, resp) => {
	resp.status(418).json({teapot : {short : true, stout : true}});
})

app.get(`/${apiPath}/circuits/:id`, (req, resp) => {
	const targetCircuit = data["circuits"].find(circuit => circuit.circuitId == req.params.id);
	
	if (targetCircuit) {
		resp.json(targetCircuit);
	} else {
		declareNotFound(resp);
	}
});

function declareNotFound(resp) {
	resp.status(404).json({error : {message : "Requested resource cannot be found."}});
}

app.listen(3000);