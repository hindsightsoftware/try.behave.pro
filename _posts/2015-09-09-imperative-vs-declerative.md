---

title: Imperative vs. Declarative
author: arowlands
date: 09-09-2015
layout: post
categories: agile bdd

---

Scenario’s written both Imperative and Declarative have their benefits should be used as situationally appropriate. Imperative Scenario’s go through the expected behaviour of the system step by step using explicit examples. Declarative instead explains the expected behaviour with more generalised higher-level examples. Declarative Scenarios are therefore often shorter than imperative and include very few “And”’s or “But”’s. 

Imperative:

``` 
Scenario: Checking in Guest 
Given: I am on the check-in screen 
When: I enter the customers name 
And: I enter the customers date of birth 
And: I click on the "Proceed" button 
Then: A confirmation message appears stating the customers room number
```

Declarative:

```
Scenario: Checking in guest 
Given: I am on the check-in screen 
When: I enter the required fields 
Then: A confirmation message appears stating the customers room number 
```

A problem with writing in an imperative style is that the granulated, low-level natured steps start to describe the User Interface (UI), making design decisions upfront by binding the scenario to the UI. They are littered with words such as ‘Navigate’, ‘Fill In’ and ‘Press’. 

Another problem with their granulated nature is that they describe implementation, meaning changes can result in having to re-write the scenario. For example, if as well as Name and Date of Birth, a Booking number field was added as a dependancy, an additional ‘And’ step would need to be included for the example scenario and all other scenarios associated with the check-in system.

This is not true of Declaratively written scenarios as their focus is on the system’s behaviour as opposed to its implementation - the goal remains clear and it describes what the user achieves; not how they achieve it. They are also much shorter than Imperative scenarios, meaning that they are more likely to be read and understood by Product Owners and the Business. 

Both styles have their merits, but it is a situational decision that needs to be taken over which is more appropriate for each project, story or even scenario. It is important to remember however, that the Business has to understand the scenarios in order to have the conversation. Therefore, if they have a preference about Declarative or Imperative, then that is the style the scenarios must be written in. 