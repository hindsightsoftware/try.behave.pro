---

title: Discovering more Examples
author: arowlands
date: 09-09-2015
layout: post
categories: agile bdd

---

Scenarios are specific examples containing explicit details, in order to clarify how a User Story should be implemented. 

Example discovery is usually a process of logic and refactoring - visiting previously written scenarios and looking for ambiguity in functionality implementation. But what if there was an easier way...

**```Should```**

The argument is simple. Scenarios are often written as so:

```
Given: a guest with a standard room reservation
And: the guest is a gold loyalty member
And: there are superior rooms available
When: the user checks in the guest
Then: the guest will be upgraded to the superior room
```

“Will” is defined as “expressing inevitable events”. It is certain. Rigid. Unchangeable. Real life situations are never certain. Changing “Will” for “Should” creates uncertainty through a passive voice.  

```
Given: a guest with a standard room reservation
And: the guest is a gold loyalty member
And: there are superior rooms available
When: the user checks in the guest
Then: the guest should be upgraded to the superior room
```

As Liz Keogh said in a blog post on the same subject “Certainty is only good when combined with accuracy, otherwise it’s false assumption.” These assumptions lead to scenario’s not being written and, in turn, gaps in functionality in the software. Replacing “Will” with “Should” triggers the Three Amigo’s to question, “What if that doesn’t happen?”. They can then write additional scenario’s making sure that there are examples which include edge cases. 
