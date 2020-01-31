const { join } = require('path');

module.exports = {
  siteMetadata: {
    title: `Stuff & Things - A Blog`,
    author: `Ariel Abreu`,
    description: `My personal blog about stuff and things`,
    siteUrl: `https://facekapow.github.io/`,
    social: {
      twitter: `facekapow`,
      github: `facekapow`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: join(__dirname, `content`, `blog`),
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: join(__dirname, `content`, `assets`),
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-captions`,
          `gatsby-remark-special-blockquotes`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Brogrammer`,
              wrapperClassName: ``,
              injectStyles: false,
              extensions: [
                join(__dirname, `vscode-extensions`, `gerane.VSCodeThemes`, `gerane.Theme-Brogrammer`, `package.json`),
              ],
              extensionDataDirectory: join(__dirname, `vscode-extensions`),
              languageAliases: {
                sh: `bash`
              },
              replaceColor: x => x,
              getLineClassName({ content, index, language, codeFenceOptions }) {
                return ``
              },
              logLevel: `error`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-61426995-6`,
        respectDNT: true,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Stuff & Things - A Blog`,
        short_name: `S&T`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: join(__dirname, `content`, `assets`, `stuff-and-things.png`),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: join(__dirname, `src`, `utils`, `typography`),
      },
    },
    `gatsby-plugin-catch-links`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
