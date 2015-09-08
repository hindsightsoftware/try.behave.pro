---

title: When Feature Toggles might go wrong
author: aparkinson
date: 2014-05-30
layout: post
categories: engineering
---

This post could have two different titles "Don’t forget Technical Support in DevOps" and "When  Feature toggles might go wrong". Our failure with [Feature Toggles](http://martinfowler.com/bliki/FeatureToggle.html) is a direct example of not considering Technical Support as a concern when developing software and it’s ultimate impact on the business model.

The origins of this post are based on a talk I gave on how we use Feature Branching at Hindsight for the London Continuous Delivery meetup in September 2013. I had started to write the talk up as a single blog post but it had turned into a long rambling essay with no end in sight. As I believe there is an important lesson people can learn and after a request by [Steve Smith](https://twitter.com/AgileSteveSmith/statuses/464773307230089216), I’ve broken this down into multiple posts.

A quick history lesson. Hindsight was founded 2 years ago as a Lean Startup with 3 months of funding. We produced our MVP (Minimum Viable Product) within the first 2 months and started selling on the Atlassian Marketplace. This was a JIRA plugin (Behave for JIRA) that was installed directly into the JIRA server and executed within the same JVM process. 

As a lean startup product feedback and acting upon it quickly was important to us. To aid us with the tight feedback loop we implemented Continuous Delivery. Yes, you can do Continuous Delivery for on premise/shrink wrapped software, it might look a little different but the principles are the same. 

We published our software to three different artifact repositories and customers choose which to pull/install from:

* The first contains all release candidates that made it successfully through our CD pipeline. We eat our dog food (We use our product to develop the product) so these artifacts are deployed to our own company instance as dogfooding. This is quite handy for picking up usability issues and the rare occasion the we missed something in our pipeline
* The second repository contains all the releases successfully deployed to the dog food instance and not rolled back within a few hours.
* The third repository contains all the releases that the team selects to be promoted from the second repository. These releases appear on the Atlassian Marketplace, our route to market and default channel for customer releases.

We could release to the first repository every 15 minutes and promotions upto the third and final repository could be several times a week or every other week depending on needs. If we needed to we could go from commit to the 3rd repository in 25 minutes.

I digress….  We followed common Continuous Delivery good practices and implemented Feature Toggles (Also know as Flippers) and [Branch by Abstraction](http://martinfowler.com/bliki/BranchByAbstraction.html). Unfortunately we hit issues with Feature Toggles after 6 months and the problem occurred in an unexpected place, Technical support.

Our technical support was already complicated because we had to support five different databases (MySQL, PostgreSQL, HSQLDB, MS SQL Server and Oracle) and access was through a 3rd party ORM (Object Relational Mapping) library. The product supported 6 different versions of JIRA (4.4 to 6.1) and each JIRA version used different versions of the ORM, some of them buggy.

When you have a shrink wrapped product customers install on their own hardware, you lose control of data storage and the deployment rollback processes. This loss of control had a major impact on our toggles. Their configuration was stored in the product database. Customers are free to test new versions of the product, rollback to a previous version, deploy and rollback versions of JIRA and their databases. This means toggle configurations can be changed quite dramatically by customers, mainly by accident.

This impacted support in two ways.

1) Increased email chain length for support enquires and time to resolution for customers. For complex problems additional information was required from customers to understand the installation history (including rollbacks) and potential changes to the toggles. This caused longer conversations and the increased complexity impacted on the issue resolution time.

2) Increasing numbers of end users at customers reporting "Feature x no long works". Is this a new bug or a toggle being turned off by accident? On further analysis this increase was due to accidental toggle configuration changes. We were creating more work for ourselves.

Every new incident or increased time to resolution for incidents has a fundamental impact on the business, it was slowing delivery of new features. We are too small to have a dedicated Technical Support engineer so developers were responsible for support, and increased support overheads means less product development. Even if we did have dedicated Technical support engineers their time grows linearly with product sales. The bottom line is, unnecessary  technical support overheads lowers the gross profit of the product.

Gross profit of the product is fundamental to any business model so we took the radical step of switching from heavy use of feature toggles to feature branching. Within one quarter we reduced technical support time by over 60%. We are small flexible team with a small dataset and it is hard to isolate all the savings down to the switch, but as a team we feel it was the right move.

I’m going to save how we made feature branching work for us to another post… sorry about that. It is worth noting we haven’t completely thrown away feature toggles, we just use them very sparingly. At the present moment we only have two toggles within our SaaS product [Behave Pro](http://www.hindsightsoftware.com/solutions/behave-pro). These are for a new user interface and a major change in a 3rd party integration.

Our story shows engineering decisions can have an impact on Technical support costs and consequently the business model or the value the software provides.

When you are selling shrink wrapped software you don’t have the operations element of DevOps but your technical support team could be providing support to operations at your customers. Tech support to a certain extent ends up as a proxy for operations in this situation. In the DevOps world we should be embedding Technical Support into the development teams just like we do with operations.


