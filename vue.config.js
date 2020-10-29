module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'AMap': 'AMap', // 高德地图配置
            'Loca': 'Loca',
            'AMapUI': 'AMapUI'
        }
    },
}