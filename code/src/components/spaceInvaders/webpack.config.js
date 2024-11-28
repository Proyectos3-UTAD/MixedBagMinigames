const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js', // Nombre del archivo generado
    assetModuleFilename: 'assets/[name][ext]', // Carpeta para imágenes
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Procesar archivos .js y .jsx
        exclude: /node_modules/, // Ignorar node_modules
        use: {
          loader: 'babel-loader', // Usar Babel para transformar el código
        },
      },
      {
        test: /\.scss$/, // Procesar archivos .scss
        use: [
          'style-loader', // Inserta estilos en el DOM
          'css-loader', // Resuelve @import y url() en CSS
          'postcss-loader', // Para autoprefixing, etc.
          'resolve-url-loader', // Resuelve rutas relativas en SCSS
          'sass-loader', // Compila SCSS a CSS
        ],
      },
      {
        test: /\.css$/, // Procesar archivos .css
        use: [
          'style-loader', // Inserta estilos en el DOM
          'css-loader', // Resuelve @import y url() en CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Procesar imágenes
        type: 'asset/resource', // Copia automáticamente imágenes y devuelve su URL
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones que se pueden omitir al importar
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Carpeta para servir los archivos
    },
    compress: true, // Activa la compresión gzip
    port: 9000, // Puerto para el servidor
    open: true, // Abre automáticamente el navegador
  },
};
