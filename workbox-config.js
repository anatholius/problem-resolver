module.exports = {
    globDirectory: "public/",
    globPatterns:  [
        "**/*.{json,js,css,svg,png}",
        "/",
    ],
    swDest:        "public/pr-sw.js",
    skipWaiting:   false,
    // "swSrc":         "assets/pwa/sw-customizations.js",
};