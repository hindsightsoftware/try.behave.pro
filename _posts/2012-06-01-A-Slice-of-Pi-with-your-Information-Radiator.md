---
title: A Slice of Pi with your Information Radiator
author: aparkinson
date: 2012-06-01
layout: post
categories: engineering
---
 
Most of you would of heard of the Raspberry Pi - a low powered credit card sized computer released in the last few months. After a wait I managed to get my hands on one of these nifty devices and have put one of my ideas into action: a power efficient information radiator.

Information radiators are very useful visual tools that allow anyone at a glance to see the state of the project and receive feedback from important systems. Typically an old or spare PC is used to run a web browser rendering information to a large screen or TV displayed in the team's work area. JIRA has a handy Wallboard plugin that can turn any dashboard into a format to appear on a Information Radiator.
<span class="more"></span>
With PCs using between 60-300 watts of power they are not the most power efficient compared to the Raspberry's 2 watts. The Raspberry Pi also has other benefits.

* Cost: Old machines while still capable often need new components due to age and many years of use. The cost of a Raspberry Pi is approx $25-35 per unit depending on the model. This price is often the same or cheaper than replacing a Power supply or Hard disk of a old computer.

* GPIO: The Raspberry has a set of pins which can be used to interface it to electronics. This could be used to drive lamps or LEDs to draw team members attention to the information radiator when important events occur, e.g. Build Fail

* Small and Quiet: The circuit board of the Raspberry could be mounted on the back of the Visual Display whereas a PC is rather large and heavy.

### Enough of the why, does the Raspberry Pi work?
Spoiler alert! It does work - but not out of the box.

My first attempt at the information radiator was using the stock Debian Squeeze distribution provided by the Raspberry Pi Foundation. This distribution comes with the lightweight Webkit (the same engine as Chrome and Safari) based browser, Midori. The version of Midori happens to be 0.2.4-3 and couldn't handle the Javascript with JIRA 5  (I haven't tested other JIRA versions).

![Raspberry Pi Assembled](/assets/images/post/RaspberryPiAssembled.jpg)

### Hang on, Firefox and Chrome are both available on Linux.
The Raspberry Pi has a ARM 11 based processor so we are limited on choice of Linux distributions and the packages which have been compiled for "armtel".

There is a community project [raspbian](http://www.raspbian.org/) currently porting the more up to date Debian Whezzy distribution to the ARM processor used in the Raspberry. This saved the day because it provided a cross compiled version of Midori 0.4.3 with good javascript support.

Raspbian is in the early stages of development and no official images have been provided, but there are Community produce images available. I used the image produced by [Hexxeh](http://www.raspbian.org/HexxehImages), version r3. Once I had written this image to my SD card, I booted the Raspberry Pi and logged in using the "root" user and "hexxeh" password. 

The image is rather simple and we need to add a few extra packages and configurations to make it useful for our purposes.


```$ apt-get install ntp fake-hwclock```

```$ dpkg-reconfigure tzdata```

```$ apt-get install locales```

```$ dpkg-reconfigure locales```

```$ apt-get install console-data```

```$ dpkg-reconfigure console-data```

```$ apt-get install lxde-icon-theme```

```$ apt-get install midori```

As JIRA sends a large amount of files and data over HTTP, this can flood the buffers on a swapless system like the Raspberry and lead it to run out of memory. To avoid this a little kernel tweaking needs to take place. Edit ```/etc/sysctl.conf``` (Hint to Linux noobs: ```nano /etc/sysctl.conf```) and add ```vm.min_free_kbytes = 8192``` as the last line. Reboot the Raspberry (```reboot```) and then you are ready to start the GUI with ```startx``` and open the Midori web browser from the Desktop menu and open JIRA with the Wallboard plugin running.

### Performance

My wallboard configuration in JIRA had 2 dashboards setup as a slideshow with slide left animation. My dashboards contained the following Gadgets
 
* Greenhooper Agile Gadget (Used as a Sprint Burndown graph)

* Greenhooper Rapid Board (Displays our Current sprint task in swimlanes)

* Activity stream

* Several JQL Filter Results

There is a initial wait of 30 seconds to load the wallboard slide show and the slide animation between dashboards was a little jerky. But this is be to expected on a low power device without much optimization in the compilation of the web browser and javascript engine. Both these performance issues represent no usability problems as a information radiator due to the fact its not an interactive system. These issue are likely to be reduced with optimisation of the software packages (The current focus is to get them to run) and most importantly improvements in the use of Raspberry's dedicated GPU.


#### Notes
I have tested some TV's with the Raspberry PI and the Raspian distribution and some of them have had issues with the xserver. I haven't had enough time to investigate these issues in detail but a manual configuration of the xserver should be the solution.