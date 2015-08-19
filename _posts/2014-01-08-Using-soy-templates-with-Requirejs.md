---
title: Using soy templates with Requirejs
author: cdowler
date: 2014-01-08
layout: post
categories: engineering
---

Soy-to-require is a simple node library to wrap soy files in requirejs.

One of the biggest hurdles when working on Behave pro is working with the multiple build systems required to support JIRA, packages for different operating systems and soon to be a standalone package.

On some of our projects we use a build tool called Grunt, a node based task runner to automate builds using packages found on npm/grunt plugin directory.

We also use requirejs, a module loader to manage dependencies with ease. Sadly soy templates don't natively support requirejs. Require uses a config file that can manage files that don't support requrie. For example when you include jquery you have to set the path of the js file and add the variable name to the exports properties.

``` javascript
require.config({
  baseUrl: 'js/',
  paths: {
    "jquery": "lib/jquery"
  },
  shim: {
    "jquery": {
      "exports": "$"
    }
  }
});
```

This effectively wraps the library in a requirejs define that can be accessed later.

``` javascript
var jquery = require('jquery');
```

So it is possible to add every template to the paths object and then add the export property to the shim but you'll have to do this every time a new template is created. To solve this and automatically wrap I wrote a simple Grunt task to prepend and append some code snippets to the compiled template.

Soy templates when compiled provide a namespace that contains the template, if not wrapped in a function it becomes global which is something I aimed to avoid to keep the app as neat as possible.
###So how do I use it?

Assuming you have npm & grunt setup (google is your friend)

- Add ```"soy-to-require": "~0.0.1"``` to your package.json

- Run ```npm install``` from the project root

- Add a property to your Grunt config

``` javascript
"soy-to-require": {
      "namespace": "TemplateNamespace",
      "templates": "path/to/templates"
}
```

- Replace the namespace and templates property with your own values

- In your require config add a path to soy

``` javascript
require.config({
  baseUrl: 'js/',
  paths: {
    "soy": "lib/soy"
  },
  shim: {
    "soy": {
      "exports": "soy"
    }
  }
});
```

- To use templates in your modules

``` javascript
define(function(require) {
    var fooTemplate = require('templates/compiledTemplate.soy'); // compiledTemplate.soy.js
});
```

Contribute
----
Used the plugin and found a bug/possible feature?

- [soy-to-require on GitHub issues] - Problem?
- [soy-to-require on GitHub features] - Feature?
- [@charliedowler] - Tweet me!
- [@TeamHindsight] - Tweet us!

[soy-to-require on GitHub issues]:https://github.com/charliedowler/soy-to-require/issues
[soy-to-require on GitHub features]:https://github.com/charliedowler/soy-to-require/pulls
[@charliedowler]:https://twitter.com/charliedowler
[@TeamHindsight]:https://twitter.com/TeamHindsight
