---

title: Continuous Delivery and Bamboo 5
author: aparkinson
date: 2013-07-15
layout: post
categories: engineering
---

Delivering software quickly and frequently can be a business advantage. Bamboo is known as a continuous integration tool but now has some very useful features to help with continuous delivery and can help deliver this business advantage.

The idea of lean start ups is to rapidly make incremental product changes and evaluate the customer response. To do this for our product Behave for JIRA we used the concept of continuous delivery, releasing a new version every 2-3 weeks featuring new functionality based on customer feedback. This helped to establish a feature set that our customers wanted, allowing us within 6 months to go from a prototype minimum viable product to a full product that customers were paying for. 

So what is the problem that continuous integration solves? Well, how many times have you said as a developer "it worked on my machine" when you've received a bug report? Continuous integration solves this problem. It takes every single commit, builds it, packages it, and runs automated test suites (unit tests, integration tests, and selenium tests). 

Continuous Delivery takes continuous integration several steps further. The concept is all about patterns and building a pipeline from requirements to actually delivering working software to customer. 

We think creating software is just like running a marathon; the hardest part is the last few miles - getting the software into the customers hands. This is the last stage in the Continuous Delivery pipeline.

Deployment projects in Bamboo 5 can help solve this. In the instance of continuous integration, you have green for good, red for bad builds etc. In continuous delivery we need to think about the release process. Taking each individual build, mapping it to a version number and releasing it. How you map it is up to you, but CI is not designed for assigning release numbers. Bamboo 5 focuses on helping to solve this final mile of delivering the software. It introduces the concept of "Deployment Projects". The sole purpose of these projects are to deploy a "Release" of your software to a particular environment. 

![Deploy project Screen shot](/assets/images/post/deploymentProjectEnviroments.png)

"Environments" represent a logically named location where the software can be deployed. This would be an instance of a application container, platform, server or artifact repository. Common examples would be QA server, Staging and Production. Each environment is also responsible for understanding how to deploy your release artifacts to the required system or location. This deployment process is implemented using the familiar Bamboo tasks.

Bamboo 5 has some awesome features for helping you solve the last mile problem of getting your software into your customers hands in a way that is quick, reliable and consistent. Bamboo 5 has been released today and you can [download](http://www.atlassian.com/software/bamboo/download) a copy from the Atlassian website.

