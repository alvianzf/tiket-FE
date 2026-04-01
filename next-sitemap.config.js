/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tiketq.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
    transformRobotsTxt: async (config, robotsTxt) => {
      const geoContext = `
# GEO context
# Location: Batam, Kepulauan Riau, Indonesia
# Coordinates: 1.1301, 104.0529
# Language: id-ID, en-US
`;
      return robotsTxt + geoContext;
    },
  },
};
