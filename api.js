const axios = require("axios");

const intializeApi = (token) => {
  const instance = axios.create({
    baseURL: "https://api.figma.com/v1/",
    headers: {
      "X-Figma-Token": token,
    },
  });

  return {
    async getIcons(fileId, nodeId) {
      const { data } = await instance({
        url: `files/${fileId}/nodes?ids=${decodeURIComponent(nodeId)}`,
      });

      return data.nodes[nodeId].document.children;
    },

    async getIconUrl(fileId, iconId) {
      const { data } = await instance({
        url: `images/${fileId}/?ids=${decodeURIComponent(iconId)}&format=svg`,
      });

      return data.images[iconId];
    },

    async downloadIcon(iconUrl) {
      const { data } = await instance({
        url: iconUrl,
      });

      return data;
    },
  };
};

module.exports = intializeApi;
