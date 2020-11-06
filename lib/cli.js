#!/usr/bin/env node
const meow = require("meow");
const exporter = require("./exporter");

const cli = meow(
  `
	Usage
	  $ figma-react-icons -t $FIGMA_TOKEN -o ./src/ -f <file-id> -n <node-id>

	Options
	  --token, -t  Set a token exporter can use - required
	  --file, -f  Set the file id - required
	  --node, -n  Set the node id - required
	  --output, -o  Output folder - required
`,
  {
    flags: {
      token: {
        type: "string",
        alias: "t",
        isRequired: true,
      },
      output: {
        type: "string",
        alias: "o",
        isRequired: true,
      },
      file: {
        type: "string",
        alias: "f",
        isRequired: true,
      },
      node: {
        type: "string",
        alias: "n",
        isRequired: true,
      },
    },
  }
);

exporter(cli.flags)
  .then((iconNames) => {
    console.log(`Successfully created ${iconNames.length} icons`);
  })
  .catch((err) => {
    console.error("Error occured", err);
  });

module.exports = cli;
