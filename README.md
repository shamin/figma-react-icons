# figma-react-icons

[![npm version](https://badge.fury.io/js/figma-react-icons.svg)](https://badge.fury.io/js/figma-react-icons)

CLI to genereate react icon component files from figma


## Install
```bash
$ npm install --global figma-react-icons
```

## Prerequesties
You will need to have a figma access token, you can get it from [here](https://www.figma.com/developers/api#authentication).


## How to use

- Create a figma file with icons like this [file](https://www.figma.com/file/B1v7c2kZ8EnvF3tLlxmT69/how-to-delivery-svg-from-figma-to-react?node-id=0%3A1).

- Open the project in a browser to get `file id` and `node id` from the figma url. You need to select the artboard to view the node id.

For example, for a url like this,
```
https://www.figma.com/file/B1v7c2kZ8EnvG3tLlxmT89/how-to-delivery-svg-from-figma-to-react?node-id=2%3A3
```

The file id is `B1v7c2kZ8EnvG3tLlxmT89` and the node id is `2%3A3`.

- Use the cli to generate the icon component files.

```bash
$ figma-react-icons -t $FIGMA_TOKEN -o <output-folder> -f <file-id> -n <node-id>
```

## Inspiration

This is a CLI version of [how-to-deliver-svg-icons-to-react](https://github.com/vborodulin/how-to-deliver-svg-icons-to-react) created by [@vborodulin](https://github.com/vborodulin/how-to-deliver-svg-icons-to-react)
