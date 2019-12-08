/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/build/precache-manifest.c6581c4ac7cd69212ab28914dd05539b.js"
);

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\/.*\.(?:json,js,css,scss,html,php)$/, new workbox.strategies.CacheFirst({ "cacheName":"precache-app-files", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\/.*\.(?:svg,png,jpg,jpeg,gif)$/, new workbox.strategies.CacheFirst({ "cacheName":"precache-app-images", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\/.*\.(?:ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)$/, new workbox.strategies.CacheFirst({ "cacheName":"precache-app-images", plugins: [] }), 'GET');
workbox.routing.registerRoute("/", new workbox.strategies.CacheFirst({ "cacheName":"precache-app-page", plugins: [] }), 'GET');
