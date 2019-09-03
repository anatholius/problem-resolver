module.exports = {
    globDirectory: "public/",
    globPatterns:  [
        "**/*.{json,js,css,svg,png}",
        "/",
    ],
    swDest:        "public/sw.js",
    skipWaiting:   false,
    // "swSrc":         "assets/pwa/sw-customizations.js",
};