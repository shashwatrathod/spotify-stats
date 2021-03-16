/** @type {import("snowpack").SnowpackUserConfig } */

const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({
  target: "http://localhost:5000",
});

module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-dotenv"],
  routes: [
    {
      src: "/api/.*",
      dest: (req, res) => proxy.web(req, res),
    },
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
