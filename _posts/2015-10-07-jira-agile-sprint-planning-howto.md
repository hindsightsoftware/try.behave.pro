---
title: Using JIRA to prepare for Sprint Planning
author: aparkinson
date: 2015-10-07
layout: post
categories: agile tips
---

It is often recommended for the Product Owner to bring two sprints worth of User Stories to [Sprint Planning](https://www.mountaingoatsoftware.com/agile/scrum/sprint-planning-meeting). Getting familiar with a couple of JIRA Agile’s features can help the Product Owner prepare for the planning meeting.

What we need is a method of selecting a group of issues as our two sprints worth and just displaying this group during sprint planning. 

This can be done simply in JIRA by using labels to identify any Issues/User Stories we want to include in Sprint planning. In this example I’m going to use “SprintPlanning” as the designated label and to prepare for sprint planning you just need to add the label to any User Story I wish include in sprint planning.

<img src="/assets/images/post/sprint-planning/add-sprint-planning-label.png"/>

A label can be edited just like any other field on a JIRA Issue or when an issue is selected pressing the “l” key will pop open a dialog to edit the labels. This keyboard shortcut is particularly useful when working with Agile boards as it saves a number of mouse clicks.

*Tip: To help see what I have already selected for sprint planning and to help my general product owner workflow, I’ve created my own personal agile board and added swimlanes for sprint planning and the current sprint.*

Now we have selected our items for Sprint Planning, we only want them to appear on the Backlog within the teams agile board. This can be simply done by creating a quick filter on the board.

When viewing the Scrum board you wish to modify, open the “board” menu in the top right hand corner and select “configure” to open the board's configuration page. Select the “Quick Filters” tab from the left hand side. Create a new filter called “Sprint Planning” and add “labels in (SprintPlanning)” in the JQL field.

<img src="/assets/images/post/sprint-planning/configure-sprint-planing-quick-filter.png"/>

When in a planning session don't forget to select the “Sprint Planning” quick filter, it should be highlighted in blue. Now you have your small group of items for planning displayed and without having to go through the whole backlog.

<img src="/assets/images/post/sprint-planning/sprint-planning.png"/>

##Bonus point: Notifying team members
It can be useful to email ahead of time certain team members the User Stories and Issues to be discussed during sprint planning. Lucky for us we can automate this task in JIRA by extending the JQL query we created earlier.

The first step is to start a new Issue Search in JIRA (Issues -> “Search for Issues” menu item on the top navigation bar) and enter the following JQL Query 
```project = SSP AND resolution = Unresolved AND labels in (SprintPlanning)```
. This will return all your items selected for Planning. Note: you will need to change the project key and may need to put the search into advanced mode.

Use the “Save as” button (Top left corner) to save the filter with a memorable name. Open the “details” inline dialog of the save filter and adjust the permissions so your colleagues can access it.

<img src="/assets/images/post/sprint-planning/issue-search.png"/>

The final step is to select “New Subscription” and select the JIRA User Group to send the sprint planning list to and on when to send it (I normally send it the day before sprint planning).

*Tip: JIRA Groups might send the email to many people. If this is the case I share the filter with colleagues and get them to add their own “personal subscription”.*

<img src="/assets/images/post/sprint-planning/share-filter.png"/>

That’s it. For less than 15 minutes work you can setup JIRA to organise your Sprint Planning.