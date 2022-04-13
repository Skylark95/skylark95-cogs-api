const express = require('express')
const expressJSDocSwagger = require('express-jsdoc-swagger');
const birds = require('./wingspan/birds');

const options = {
  info: {
    version: '1.0.0',
    title: 'Skylark95 Cogs API',
    description: 'Companion API to <a href="https://github.com/Skylark95/skylark95-cogs">skylark95-cogs</a>.',
    license: {
      name: 'MIT',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
};

const app = express()
const PORT = process.env.PORT || 3000

expressJSDocSwagger(app)(options);

app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/wingspan/v1/birds', birds);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});