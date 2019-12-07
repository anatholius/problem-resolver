const Encore = require('@symfony/webpack-encore');
const WorkboxPlugin = require('workbox-webpack-plugin');

console.log('Encore.isProduction()', Encore.isProduction());
console.log('Encore.isDev()', Encore.isDev());
console.log('Encore.isDevServer()', Encore.isDevServer());

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath((Encore.isDevServer() ? 'https://127.0.0.1:8083' : '') + '/build')
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('build/')
    
    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    /*
    .createSharedEntry('layout', './assets/js/layout.js')
    /*/
    .splitEntryChunks()
    //*/
    .addEntry('app', './assets/js/app.js')
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')
    
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    
    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    // .enableSingleRuntimeChunk()
    .disableSingleRuntimeChunk()
    
    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    
    // enables Sass/SCSS support
    .enableSassLoader()
    
    // enables @babel/preset-env polyfills
    .configureBabel((babelConfig) => {
        const plugins = [];
        if (Encore.isProduction()) {
            plugins.push('transform-react-remove-prop-types');
        }
        plugins.push(
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
        );
        babelConfig.plugins = plugins
        
    }, {
        useBuiltIns: 'usage',
        corejs:      3,
    })
    
    .copyFiles([
        // copies to {output}/static
        {from: './assets/static', to: 'static/[path][name].[ext]'},
        // {from: './assets/pwa', to: 'pwa/[path][name].[ext]'},
    ])
    
    .configureManifestPlugin((options) => {
        options.fileName = 'manifest.json';
        let basePath = '';
        if (Encore.isDevServer()) {
            options.publicPath = 'https://127.0.0.1:8083/';
            basePath = 'https://127.0.0.1:8083/build/';
        } else if (Encore.isDev()) {
            // options.publicPath = 'https://127.0.0.1:8083';
            basePath = '';
        }
        const iconTemplate = 'white/';
        options.seed = {
            name:                        'Problem Resolver',
            short_name:                  'PR',
            icons:                       [
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-72x72.png`,
                    "sizes": "72x72",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-96x96.png`,
                    "sizes": "96x96",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-128x128.png`,
                    "sizes": "128x128",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-144x144.png`,
                    "sizes": "144x144",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-152x152.png`,
                    "sizes": "152x152",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-192x192.png`,
                    "sizes": "192x192",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-384x384.png`,
                    "sizes": "384x384",
                    "type":  "image/png",
                },
                {
                    "src":   `${basePath}static/icons/${iconTemplate}icon-512x512.png`,
                    "sizes": "512x512",
                    "type":  "image/png",
                },
            ],
            display:                     "standalone",
            scope:                       "/",
            start_url:                   "/",
            theme_color:                 "#000000",
            background_color:            "#ffffdd",
            prefer_related_applications: false,
        };
    })
    
    .addPlugin(new WorkboxPlugin.GenerateSW({
        "swDest":         "../sw.js",
        "include":        [
            /\/|\.json|\.js|\.css|.html|.php$/,
        ],
        "skipWaiting":    true,
        "runtimeCaching": [
            {
                urlPattern: /\/.*\.(?:json,js,css,html,php)$/,
                handler:    'CacheFirst',
                options:    {
                    cacheName: 'precache-app-files',
                },
            },
            {
                urlPattern: /\/.*\.(?:svg,png,jpg,jpeg,gif)$/,
                handler:    'CacheFirst',
                options:    {
                    cacheName: 'precache-app-images',
                },
            },
            {
                urlPattern: '/',
                handler:    'CacheFirst',
                // handler:    'NetworkFirst',
                options:    {
                    cacheName: 'precache-app-page',
                },
            },
        ],
    }))
    .addPlugin(new WorkboxPlugin.InjectManifest({
        "swDest": "sw.js",
        "swSrc":  "assets\\pwa\\sw-customizations.js",
    }))
    
    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()
    
    
    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    // .enableIntegrityHashes(Encore.isProduction())
    
    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
    
    // uncomment if you use API Platform Admin (composer req api-admin)
    .enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
