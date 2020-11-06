const path = require("path");
const fs = require("fs-extra");
const camelCase = require("camelCase");
const intializeApi = require("./api");
const svgo = require("./svgo");
const svgr = require("@svgr/core").default;
const cliProgress = require("cli-progress");
const BluebirdPromise = require("bluebird");

async function exporter({ token, file, node, output }) {
  const outputPath = path.resolve(__dirname, output);
  await fs.emptyDir(outputPath);

  const iconsPath = path.join(outputPath, "icons");
  await fs.emptyDir(iconsPath);

  const apiInstance = intializeApi(token);

  const iconNames = [];

  const icons = await apiInstance.getIcons(file, node);

  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  progressBar.start(icons.length, 0);

  await BluebirdPromise.map(
    icons,
    async (icon) => {
      const iconUrl = await apiInstance.getIconUrl(file, icon.id);
      const iconData = await apiInstance.downloadIcon(iconUrl);

      const { data: svgCode } = await svgo.optimize(iconData);

      const iconName = camelCase(icon.name, { pascalCase: true }) + "Icon";
      iconNames.push(iconName);

      const iconFile = await svgr(
        svgCode,
        { icon: true },
        { componentName: iconName }
      );

      const iconPath = path.join(iconsPath, `${iconName}.js`);

      progressBar.increment();

      await fs.writeFile(iconPath, iconFile);
    },
    { concurrency: 3 }
  );

  progressBar.stop();

  const iconsIndexFile = iconNames
    .map((iconName) => {
      return `import ${iconName} from './icons/${iconName}'
        export { ${iconName} }
      `;
    })
    .join("\n");

  await fs.writeFile(path.join(outputPath, "index.js"), iconsIndexFile);

  return iconNames;
}

module.exports = exporter;
