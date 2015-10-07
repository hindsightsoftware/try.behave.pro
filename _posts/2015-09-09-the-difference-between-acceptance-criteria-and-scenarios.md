---

title: The difference between Acceptance Criteria and Scenario's
author: arowlands
date: 09-09-2015
layout: post
categories: agile bdd

---

A common confusion exists between Acceptance Criteria and Scenarios. So, what’s the difference? Scenarios are examples of systems behaviour, whereas Acceptance Criteria are a set of rules which refer to an aspect of a system's behaviour. This often confuses people, as they are closely connected. Acceptance Criteria can be used to derive Scenarios, and Scenarios which are phrased incorrectly can be more like Acceptance Criteria than Scenario’s, despite the fact they may be written in a ‘Given, When, Then’ format. It is very important to remember that using ‘Given, When, Then’ does not automatically make it a concrete example.

Take a look at the following pieces of text. Try and work out which are Scenarios, and which are Acceptance Criteria. Then, scroll down to the bottom of this article to found out which are which, and why. 

| a) | b) |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Given: A Customer visits the hotel for the first time.When: They check in.Then: They should be given a information about the loyalty scheme verbally and in literature. | A customer has booked a room between for a week. They have not been to the hotel before. Upon checking in they are asked if they want to become part of the Hotels loyalty scheme and offered supporting literature. |
| c) | d) |
| Jonathan the customer presents Michael the receptionist with a Gold loyalty card when checking in. Despite the fact that it has expired, as Jonathan booked the room online using the card before it expired, Michael should make sure that Jonathan is able to access the benefits that Gold loyalty card holders can take advantage of for the duration of his stay. | The location of the remote WebDriver or Selinium Grid 2 instance. Default value of 127.0.0.1 on port 4444 |

The best way to check whether a Scenario or Acceptance Criteria has been written is to look at the language. Is it describing behaviour or defining rules?

Some things to remember:

* It is important to write Scenario’s for all of the Acceptance Criteria.
* Look at the language - describing vs. defining.
* It is more productive to ask Business representatives to give you a Scenario than an Acceptance Criteria.
* Talk about both acceptance criteria and scenarios, ask why, and use scenarios to illustrate the criteria. This way, we find out more about our domain. 
* We then have the option to automate them later on. This will help provide living documentation and they act as regression tests.

| a)                                                                                                                                                                                                                                                                                                 | b)                                                                                                                                                                                                                                                                                                                                  |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| :Acceptance Criteria: :Despite being formatted in a ‘Given, When, Then’ style, this is actually acceptance criteria. This is because it does not describe how the system (In this case the system is receptionist) should behave. Instead, it is a set of rules relating to the systems behaviour. | :Scenario: :This is a scenario, despite not being formatted in a ‘Given, When, Then’ style. It is a scenario because it contains some context, an action and a set of consequences. It can be improved by being formatted in a ‘G,W,T’ style, and by containing more explicit detail such as humanising the example by using names. |
| c)                                                                                                                                                                                                                                                                                                 | d)                                                                                                                                                                                                                                                                                                                                  |
| :Acceptance Criteria: :Despite the humanisation of the text, this is an Acceptance Criteria as it describes the rules relating to the system behaviour, not the behaviour itself.                                                                                                                  | The location of the remote WebDriver or Selinium Grid 2 instance. Default value of 127.0.0.1 on port 4444                                                                                                                                                                                                                           |
