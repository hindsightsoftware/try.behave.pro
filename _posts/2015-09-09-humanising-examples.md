---

title: Humanising Examples
author: arowlands
date: 09-09-2015
layout: post
categories: agile bdd

---

The motivation for using examples to describe behaviour is to create shared understanding which makes effective collaboration possible. Therefore, the more detail that’s included in each scenario, the less room there is for ambiguity. Explicit details allow all stakeholders to create not only a deeper understanding of the business and it’s goals, but also visualise the scenario’s behaviour in effect.

A great way to do this is to include real people, roles or actors in your scenarios. The inclusion of a name, ‘Roy’, allows visualisation of behaviour. 

Non-Humanised:

```
Given: a guest with a standard room reservation
And: the guest is a gold loyalty member
And: there are superior rooms available
When: the user checks in the guest
Then: the guest should be upgraded to the superior room
```

Humanised:

```
Given: a guest has a standard room reservation
And: he is a gold loyalty member
And: there are superior rooms available
When: roy checks the guest in
Then: the guest should be upgraded to the superior room
```

This is concept can be taken further, by ‘decorating’ roles. This is additional context which does not affect the behaviour of the scenario. Decorator roles in a Hotel Booking System Scenario may be ‘Known Visitor’, ‘Booked Guest’, ‘Loyalty Club Member Guest’, ‘Recent Guest’, ‘New Member Guest’ etc. These are all pieces of context placed into the scenario after the basic scenario has been written. This helps stakeholders see patterns in how the system is used under different variables. See the following scenario; I have taken the Humanised scenario and included additional decorating details.

Decorated:

```
Given: business trip guest gary has a standard room reservation
And: he is a gold loyalty member
And: there are superior rooms available
When: roy the daytime receptionist checks gary in
Then: gary should be upgraded to the superior room
```

The inclusion of Gary’s reason for staying at the hotel is not directly relevant, but if there was a variable in the system such as guest’s being able to check in themselves on an app before arriving, then it can show how different subsections of the clientele will use the system, allowing the system to be more relevant for the heavier users.

