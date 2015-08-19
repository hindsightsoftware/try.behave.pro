---

title: Cross browser testing JavaScript
author: aparkinson
date: 2013-08-24
layout: post
categories: engineering
---

One mistake many people make is running their selenium test suites with every browser combination... you don't need to! Rendering problems are probably the biggest cross browser compatibility issue, and you can't actually test for these with Functional Tests. So by running Selenium tests across many browsers you are really testing JavaScript and DOM compatibility.

Running our Selenium tests across many browsers was our JavaScript compatibility strategy, but it proved inefficient as we ended up with bugs in Internet Explorer; how embarrassing!

We were sure we had a good Selenium test suite so how did miss the bugs? We decided to investigate. We started to look at code coverage of JavaScript in our test suite and found that only 72% of JavaScript was executed. That leaves 18% untested for compatibility and our IE bugs were located in this area. We spent some time coming up with possible solutions to our poor compatibly testing and found a simple solution.

We've been using TDD (Test Driven Development) with JavaScript but our use wasn't consistent. We decided the front end code should have the same techniques and rigour applied as the back end code, so we wanted to improve on it.

<span class="more"></span>

By reusing and running these TDD unit tests across all the different browser combinations required for compatibility, you can guarantee good compatibility of JavaScript and DOM. This is due to the fact many complex error situations can be simulated in unit tests compared to functional tests. If developers, when developing JavaScript are forcing themselves to do TDD they're creating an artifacts. As testers, we're reusing these artifacts to help us and save time and effort.

Another important reason to use JavaScript unit tests is that Selenium tests are extremely slow. If we want to test across multiple browsers it can take an age as the tests are repeatability executed. Our average Selenium test time is 8 seconds per Selenium Test, and the whole suite takes 5 minutes, which could be considered a good time. But, when you compare this performance to JavaScript unit tests there is a bit of a reality check. The our average JavaScript unit tests takes 0.1 seconds and the whole suite 11 seconds.

### How do we run our JavaScript tests in multiple browsers?

JsTestDriver has been used by many people for executing their tests in browsers but it has a few short comings and wasn't reliable when setup for Continuous Integration. Lucky for us we discovered Karma (formally known as Testacular) an awesome test runner for JavaScript that use real browsers to run the tests.

Feature Summary:

 * Can launch real browsers as required
 * Testing framework agnostic - we use Jasmine but you can use QUnit, Mocha or another framework
 * Good support for Continuous Integration
 * Supports code coverage with Instanbul

Out of the box Karma provides launchers for Chrome, Chrome Canary, Safari, Firefox, Opera, PhantomJS, and IE. The problem with theses launchers is you are required to install each browser or set-up VM's with the browsers available. This is a particular problem for management of CI and teat infrastructure. Our solution to the original problem for our Selenium Tests was to set-up a Selenium Grid.

As management of web browser installations was going to become a issue again for our CI cluster, we created "karma-webdriver-launcher". This allows Karma to access our to for using Remote WebDriver instances for providing web browsers to Karma. This allows us to leverage our existing Selenium Grid test infrastructure with our JavaScript testing strategy.

### Using Karma

Karma is written in Node.JS so you will need both Node.JS and Node Package Manager (NPM) to be installed first.

```npm install -g karma```

Install the launcher plugin for Remote WebDriver instances

```npm install -g karma-webdriver-launcher```

In the project you would like to use Karma you will need to create a karma config file. You can generate a basic Karma config file using a simple command

<div class='lang'>shell</div>
```karma init```

The generated config file won't have configured browsers from the WebDriver Launcher, so we have edit the config file. The 'browsers' array controls which browsers the tests should be executed within, in this case Internet Explorer.

``` javascript
module.exports = function(karma) {

  karma.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'Demo.js',
      'DemoSpec.js'
    ],

    // test results reporter to use
    reporters: ['progress', 'junit'],

    // Start these browsers
    browsers: ['IE'],

    ...

  });
};
```

Add a array 'customLaunchers' to the config file, this is where we can define new Wbe Browsers Karma doesn't know about. We need to define all the browsers we want to make avaialble from our Selenium Grid within 'customLaunchers'. The first part is to define the name for the new browser so we can reference them within the 'browsers' array and then you need to specify attributes to describe the browser to launch. A full list of attributes is in the table below.


<table>
        <tr>
            <th>Attribute</th>
            <th>Required Notes</th>
            <th></th>
        </tr>
        <tr>
            <td>base</td>
            <td>true</td>
            <td>The plugin to launch this browser; WebDriver</td>
        </tr>
        <tr>
            <td>browserName</td>
            <td>true</td>
            <td>The name of the browser you require, should be one of {android chrome, firefox, htmlunit, internet explorer, iPhone, iPad, opera, safari}</td>
        </tr>
        <tr>
            <td>config</td>
            <td>false</td>
            <td>The location of the remote WebDriver or Selinium Grid 2 instance. Default value of 127.0.0.1 on port 4444</td>
        </tr>
        <tr>
            <td>platform</td>
            <td>false</td>
            <td>Operating System</td>
        </tr>
        <tr>
            <td>version</td>
            <td>false</td>
            <td>Browser Version</td>
        </tr>
</table>



Example configuration for an Internet Explorer 7 instance on Windows XP.

``` javascript
karma.set({

    customLaunchers: {
      'IE7-XP': {
          base: 'WebDriver',
          browserName: 'internet explorer',
          platform: 'Windows XP',
          version: '7'
      }
    },

    ...

    browsers: ['IE7-XP'],

    ...

  });

```

By default the WebDriver launcher looks the remote WebDriver or Selenium Grid 2 instance on port 4444 on the localhost. This might be suitable and when defining many browsers you don't want to have to repeat the configuration. As the Karma config is JavaScript based, just create a common object for the configuration and pass it to the 'config' attribute of each custom launcher.

``` javascript
var grid = {
    hostname: '127.0.0.1',
    port: 4444
  };

karma.set({

    customLaunchers: {
      'IE7-XP': {
          base: 'WebDriver',
          config: grid,
          browserName: 'internet explorer',
          platform: 'Windows XP',
          version: '7'
      }
    },

    ...

    browsers: ['IE7-XP'],

    ...

  });

```

If you were to add the above example to a Karma config file and have a working Selenium Grid 2 setup you should be ready to start cross browsers testing your JavaScript. A full example project is available on [GitHub](https://github.com/hindsightsoftware/karma-webdriver-example).


