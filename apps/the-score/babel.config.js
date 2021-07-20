module.exports = {
  "presets": [
    [
      "@vue/app",
      {
        "useBuiltIns": "entry"
      }
    ],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],

}
