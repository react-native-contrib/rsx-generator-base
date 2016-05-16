const path = require('path');
const generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  configuring: function() {

    this.fs.copy(
      this.templatePath('_flowconfig'),
      this.destinationPath('.flowconfig')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_watchmanconfig'),
      this.destinationPath('.watchmanconfig')
    );
    this.fs.copy(
      this.templatePath('_buckconfig'),
      this.destinationPath('.buckconfig')
    );
  },

  writing: function() {
    if (this.options.upgrade) {
      // never upgrade index.*.js files
      return;
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {name: this.name}
    );

    if (!this.options['skip-ios']) {
      this.fs.copyTpl(
        this.templatePath('index.ios.js'),
        this.destinationPath('index.ios.js'),
        {name: this.name}
      );
    }
    if (!this.options['skip-android']) {
      this.fs.copyTpl(
        this.templatePath('index.android.js'),
        this.destinationPath('index.android.js'),
        {name: this.name}
      );
    }
  },

  install: function() {
    if (this.options.upgrade) {
      return;
    }

    this.spawnCommandSync('git', ['init'], { cwd: this.destinationPath() });
    this.npmInstall();
  }
});
