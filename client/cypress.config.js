const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",   // Local
    // baseUrl: "https://dev.d1thswjv0p8u6t.amplifyapp.com",
    setupNodeEvents(on, config) {
      // Add node event listeners here if needed
    },
  },
});

