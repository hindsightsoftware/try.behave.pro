---

title: Cross browser testing user interface rendering
author: jbastow
date: 2013-01-21
layout: post
categories: engineering
---

When it comes to front-end development with Behave for JIRA, I tend to favour Chrome as my web browser of choice but that does not allow me to escape from working with Internet Explorer. At Hindsight, we recognise Behave has to work across any number of browser and OS combinations, with the main challenges lying with Internet Explorer. Luckily IE6 is no longer a problem as Microsoft now considers it obsolete, according to <s>[IE6 countdown](http://www.ie6countdown.com/)</s>, its use is down to 0.9% in the UK and 0.4% in the US. That leaves us with Internet Explorer 7 and upwards to consider.

## Progressive Enhancement v. Graceful Degradation

The main issue with Internet Explorer is that each version of Explorer renders Behave's User Interface differently. This is due to Microsoft's inconsistent and idiosyncratic implementation of the rendering engine. In an ideal world one set of standards-based CSS style sheets would be cover all browser options, however this is still some years off. Hindsight's goal is for Behave to support IE 7 (and upwards) but also to provide a rich experience to users of the latest browsers. To ensure compatibility we a choice of 2 techniques - Progressive Enhancement or Graceful Degradation.

Both techniques work in a layered fashion that allows all users, regardless of Browser variation, to access the basic content and functionality of the Behave for JIRA plugin, while providing the full version of the Behave User Interface to those with more advanced browser software. The practical difference in development techniques is that in Progressive Enhancement I would build from the lowest layer (IE7) upwards, gradually enhancing the User Interface functionality for each individual browser, whereas with Graceful Degradation, I create the full version of the UI first for the modern browsers and then gradually reduce the functionality to suit the needs of those using older browsers.

Graceful Degradation is the natural choice for me, because I can work locally, in small iterations, on a modern browser. I can play with all the HTML5 features and get feedback as soon as the CSS or JavaScript file in question is saved (thanks to [livereload](http://livereload.com/)), leaving browser compatibility until the end of the development cycle. Working "progressively" in the other direction would mean I'd need older (and non-native, given my workstation runs Ubuntu) browsers configured and running on my box from the outset. I would be driven in my development by the limitations of the older browsers, rather than being free to explore the many options new browsers provide. 

## What's the problem?

To perform the Graceful Degradation effectively I need access to a wide range of Browser versions and different operating systems. I have to be confident that my 'test' environment is stable enough perform the graceful degradation, as it often requires disabling features and  I only want to do this as a last resort solution. 

Traditionally I would have to set-up a test environment in an isolated virtual machine for each browser and operating system combination. Launching and then maintaining all these environments is a time consuming, hardware intensive and downright inconvenient task - as much as I enjoy a bit of hands on sysadmin work, for me it's a true context shift away from the flow of development.

What do I want? I want a solution that allows me to...

* Access to a wide range of different browsers and operating systems "mid-flow"

* Do the majority of my development work in Chrome

* Keep all my work local

* Get quick and useful feedback about changes I've made many different browsers

* Know what I see is representative of what a user of that operating system and browser would see

* Reduce the administration and maintenance of test environments

## What's the Solution?

SauceLabs produce a tool called Scout, which provides 96+ different Operating System and Browser combinations. I enter the target URL into Scout, select an operating system and browser, and off I go. As I navigate the website, Scout captures live video, screenshots and makes logs, all of which are available for debrief after I end the test session. I usually keep several tabs open in Scout, one for each of the different browsers I'm testing against, and this  makes corrections simple to implement. But Scout has a limitation - it can only be used to test websites that are publicly exposed. This is a problem because it would require us to host the files on a local web server and expose our network, or to push the files to a remote web server, exposing our code and stopping us from being able to utilize livereload.

Sauce Connect enables us to use Scout with locally hosted files and bypass the above mentioned issues. Sauce Connect does this by establishing an encrypted SSH tunnel and tunnelling securely between my workstation (in Hindsight  office, behind the Hindsight firewall), and the dedicated, virtual machine in the SauceLabs cloud in California. I simply run a script on my computer to establish this connection, and then I can access my locally running web server through the web browser running in the Sauce Labs cloud. Because Sauce Connect uses an SSH tunnel I don't need to get a system administrator to change any network firewall setting unlike a VPN.

How does Sauce Connect effect my workflow? No one bit, once I run the script to open the Sauce Connect tunnel, I drop into my normal cycle of amending CSS files locally and refreshing my web browser to view the result, except the web browser in question is in the Sauce Labs cloud!

You can find out more about Scout and Sauce connect at the [SauceLabs Website](http://saucelabs.com/home)

Their free accounts come with 100 Windows, Linux & Android code minutes, 40 Mac & iOS code minutes, plus 30 minutes of manual testing per month. Remember to use the promo code "hindsight" when you sign up for a free or paid plan.

