

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5050',
          changeOrigin: true
        }
      }
    }
  }
}
