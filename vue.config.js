const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const IS_PROD = ['prod', 'production'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|html)(\?.*)?$/i //匹配格式

/**
 *
 devServer: {
    proxy: {
      '^/api': {
        target: 'https://rec.gdutelc.com/gdutrec',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
 */
module.exports = defineConfig({
  pwa: {
    iconPaths: {
      favicon32: 'favicon.svg',
      favicon16: 'favicon.svg',
      appleTouchIcon: 'favicon.svg',
      maskIcon: 'favicon.svg',
      msTileImage: 'favicon.svg'
    }
  },
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: (config) => {
    let plugins = [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
    if (IS_PROD) {
      // prod添加gzip压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240, // 大于10kb的才被压缩
          minRatio: 0.8 //压缩比例
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            priority: 1, //添加权重
            test: /node_modules/, //把这个目录下符合下面几个条件的库抽离出来
            chunks: 'initial', //刚开始就要抽离
            minChunks: 2 //重复2次使用的时候需要抽离出来
          },
          common: {
            //公共的模块
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    }
  },
  productionSourceMap: false
})
