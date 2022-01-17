const { resolve } = require("path");

module.exports = {
  base: "/website/",
  locales: {
    "/": {
      lang: "en-US",
      title: "Vuese",
      description: "One-stop solution for vue component documentation",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Vuese",
      description: "Vue 组件文档的一站式解决方案",
    },
  },
  themeConfig: {
    logo: "/vuese.png",
    sidebarDepth: 2,
    locales: {
      "/": {
        label: "English",
        nav: [
          { text: "Overview", link: "/" },
          {
            text: "Packages",
            items: [
              { text: "@vuese/cli", link: "/cli/" },
              { text: "@vuese/parser", link: "/parser/" },
              { text: "@vuese/markdown-render", link: "/markdown-render/" },
              { text: "@vuese/loader", link: "/loader/" },
              { text: "@vuese/webpack-plugin", link: "/webpack-plugin/" },
            ],
          },
          {
            text: "Vuese Explorer",
            link: "https://vuese.github.io/vuese-explorer/",
          },
        ],
      },
      "/zh/": {
        label: "简体中文",
        editLinkText: "在 GitHub 上编辑此页",
        nav: [
          { text: "概览", link: "/zh/" },
          {
            text: "Packages",
            items: [
              { text: "@vuese/cli", link: "/zh/cli/" },
              { text: "@vuese/parser", link: "/zh/parser/" },
              { text: "@vuese/markdown-render", link: "/zh/markdown-render/" },
              { text: "@vuese/loader", link: "/zh/loader/" },
              { text: "@vuese/webpack-plugin", link: "/zh/webpack-plugin/" },
            ],
          },
          {
            text: "Vuese 在线体验",
            link: "https://vuese.github.io/vuese-explorer/",
          },
        ],
      },
    },
    repo: "vuese/vuese",
    docsDir: "docs",
    docsBranch: "monorepo",
    editLinks: true,
    sidebar: "auto",
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@imgs": resolve(__dirname, "./assets/imgs"),
      },
    },
  },
};
