const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const publicDir = 'public/';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const mode = isProduction ? 'production' : 'development';
  return {
    mode,
    entry: '/src/index.js', // main js
    output: {
      path: path.resolve(__dirname, 'dist'), // output folder
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader', // for styles
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(mp3|wav|ogg|mp4|webm)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: `./.env.${mode}`,
      }),
      new HtmlWebpackPlugin({
        template: `${publicDir}index.html`, // base html
      }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json',
        publicPath: '/', // Replace with your public URL or path
        seed: {
          short_name: 'React App',
          name: 'Create React App Sample',
          icons: [
            {
              src: `${publicDir}favicon.ico`,
              sizes: '64x64 32x32 24x24 16x16',
              type: 'image/x-icon',
            },
            {
              src: `${publicDir}logo192.png`,
              type: 'image/png',
              sizes: '192x192',
            },
            {
              src: `${publicDir}logo512.png`,
              type: 'image/png',
              sizes: '512x512',
            },
          ],
          start_url: '.',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',
        }
        ,
      }),
      new CopyPlugin({
        patterns: [
          { from: `${publicDir}**/*.{png,ico}`, to: './' },
        ],
      }),
    ],
  };
};
