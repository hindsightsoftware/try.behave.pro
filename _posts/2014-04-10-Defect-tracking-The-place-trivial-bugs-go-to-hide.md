---

title: Defect tracking - The place trivial bugs go to hide
author: aparkinson
date: 2014-04-10
layout: post
categories: engineering agile
---

Two weeks ago I was at the excellent TestBash in Brighton and as you do at conferences you get into discussions and debates with new people. While leaving the conference to head to the after party I got into one such heated conversation with Carly Dyson ([@carlymdyson](https://twitter.com/carlymdyson)) with some input from Zac Borrelli ([@zacoid55](https://twitter.com/zacoid55)) and Stephen Blower ([@badbud65](https://twitter.com/badbud65)). The topic “Should you report trivial bugs like missing full stops”. 

I didn’t manage to convince my fellow conference attendees with my response of "Sometimes not" and was beaten down with "Always", perhaps being a Director, Product owner, and both former developer and tester has given me a strange opinion. As the pen is mightier than the sword I thought I would commit, and flesh out my argument to magnetic disk for others.

The Testers role is to gather evidence for the product owner (or another appropriate role) to decide if a release can be made. One form of this evidence is bug reports and they have to be sifted through to filter out the noise to find the real issues that make the release risky. As a current Product Owner I want to do this task quickly and reliably, if some of the noise can be filtered out it would make the job easier. 

As PO you could ignore all the “trivial” severity bugs in your defect tracker to reduce the noise when making the decision. The rest of the team will then become blinded to the trivial issues as they have no reason to look at them. The result is the trivial bugs become a form of project debt that no one will pay down by fixing them.  The time and energy gone into reporting them is wasted.

Surely it would be better than recording them, to find or IM a dev and ask them a favour for a quick fix. This avoids writing a bug report that will be condemned to a perpetual state of "trivial" severity hell in the defect tracking tool with little chance of redemption.

To make this strategy work the testers need to be given the tools to classify bug severity and take filtering decisions. As the PO is the ultimate product visionary and decision maker it can seem hard to empower testers but I think the "attributes" concept from [Google's ACC model](https://code.google.com/p/test-analytics/wiki/AccExplained) is the answer.

Within in ACC, Attributes are qualities and characteristics that promote the product and distinguish it from the competition. The Product Owner/Manager will already have developed as a mental model within their heads based on the product vision. Collaboratively working with the PO this list can be extracted and be used to as an aid to make decisions on severity of bugs.

As a BDD proponent I’m a big fan of examples, so let’s look at some.

The attributes for a iPhone could be: Elegant, Fast, Easy to use. If we apply the missing full stop scenario to these attributes I believe this defect is important and definitely requires reporting because it has a negative effect on the products attributes.

Now apply the same missing full stop scenario to the attributes of a large internal enterprise system; Stable, reliable, secure. In this particular case as long as the defect isn’t causing a mistake then it shouldn’t be placed in the defect tracker as it doesn’t have a negative impact on the product attributes and its business value.

Even if you don’t agree with me I would recommend investigating the attributes of your system with the Product Owner will expand and refine your perspective of the problem domain when assigning a severity. I think we can all agree many bugs go to hide in defect tracking systems so why don’t we communicate directly with our colleagues and don’t give the bugs a chance to hide. 

Note: Carly has reminded me that team structure and experience levels will have a major impact on the success of this strategy. I prefer building cross functional teams with blends of skills and don’t go for the structured siloed model of separate Dev, Testing and Ops teams. The siloed model also doesn’t encourage direct communication about trivial bugs I favour in this post.

