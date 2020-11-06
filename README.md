# figma-react-icons
CLI to genereate react icon component files from figma

## Install
```bash
$ npm install --global figma-react-icons
```

## How to use

You will need to have a figma access token, you can get it from [here](https://www.figma.com/developers/api#authentication).

You can get the file id and node id from the figma url.

```bash
$ figma-react-icons -t $FIGMA_TOKEN -o <output-folder> -f <file-id> -n <node-id>
```

## Inspiration

This is a CLI version of [how-to-deliver-svg-icons-to-react](https://github.com/vborodulin/how-to-deliver-svg-icons-to-react) created by [@vborodulin](https://github.com/vborodulin/how-to-deliver-svg-icons-to-react)
