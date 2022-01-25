module.exports = {
  siteMetadata: {
    title: `Antoine Debes`,
    description: `I am a Freelancing Full-stack Web Developer that delivers the best services under the best practices`,
    author: `Antoine Debes`,
    siteUrl: `https://antoinedebes.codes`,
    keywords: `blog, web develepment, web developer, Full-stack web developer, Fullstack web developer, front-end web developer, frontend web developer, back-end web developer, backend web developer, Software engineer, DevOps, Dev-Ops,
    css, html, css3, htm5, tailwindcss, tailwind, bootstrap, javascript, es6, best practice, SEO, Nodejs, Typescript, Reactjs, Gatsbyjs, Nextjs, MongoDB, Mysql, Laravel, WordPress, Postgresql, Typeorm, mikro-orm, jamstack, MERN, MARN, PHP`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/new-profile-pic.webp`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
