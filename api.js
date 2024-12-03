const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();

const data = {};
const defaultDataPath = path.join(__dirname, "data");

app.get("/", (req, resp) => {
	resp.json(data);
});

setData();

async function setData(dataPath = defaultDataPath) {
	const dataFiles = (await fs.readdir(dataPath)).map(filename => new DataFile(path.join(dataPath, filename)));
	
	await Promise.all(dataFiles.map(async dataFile => {
		try {
			const jsonData = await fs.readFile(dataFile.path, "utf8");
			data[dataFile.basename] = JSON.parse(jsonData);

			app.get(`/${dataFile.basename}`, (req, resp) => {
				resp.json(data[dataFile.basename]);
			});
		} catch(error) {
		 	console.error(`${dataFile.path}: ${error.message}`);
		 }
	}));

	function DataFile(absPath) {
		this.path = absPath;
		this.basename = path.basename(absPath, path.extname(absPath));
	}
}

app.listen(8080);