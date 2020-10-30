# School of Computing &mdash; Year 4 Project Proposal Form

## SECTION A

|                     |                       |
|---------------------|-----------------------|
|Project Title:       | Last Man Standing     |
|Student 1 Name:      | Tom Callaghan         |
|Student 1 ID:        | 16449672              |
|Student 2 Name:      | Philip Donnelly       |
|Student 2 ID:        | 17518149              |
|Project Supervisor:  | Dr. Donal Fitzpatrick |


## SECTION B

### Introduction

> Describe the general area covered by the project.

The aim of the project is to create a fully automated version of the well-known competition "Last Man Standing". This will be a full-stack development, of a web application, containing a React frontend, Python backend while utilising a number of AWS cloud services. 

### Outline

> Outline the proposed project.

The idea is a well-known game/competition called "Last Man Standing". Last man standing is a game/competition that is usually created within friends groups or workplaces. The game consists of players picking a football team from the premier league every week and if the team wins they go through to the next round if it loses they are knocked out. These competitions are run using excel sheets and require a lot of manual input and maintenance. We want to get rid of this and create a web application to automate the whole process.

### Background

> Where did the ideas come from?

Over the last number of years, both of us have participated in numerous "Last Man Standing" competitions/games. These competitions hold a very large number of people, ranging from 20-500+. The majority of these competitions are run for charity, where part of the entry fee is donated to charity. From our own experiences and also speaking the number of people that run these competitions, we have identified a niche in the market for a fully automated version of this competition/game. From speaking to these maintainers, we found out that the most popular way for this competition/game to be organised is through a very large excel sheet. This solution results in hours upon hours of manual input/cross-checking previous picked teams which can result in human error.

### Achievements

> What functions will the project provide? Who will the users be?

The "Last Man Standing" web application will provide both players/maintainers with an interactive new experience when playing/maintaining "Last Man Standing". Last Man Standing will allow users to create their own profiles and leagues. They can then invite their friends or other competitors to these leagues. Once in a league, the user will be able to see the current fixtures for the upcoming week and the probabilities of each team winning their respective games. Each week a user will select a team. If the team has been selected by the user before the user will be prompted to make a different selection. During the weekend the selection process will be locked to prevent any user from changing their pick mid-game. Whilst the games are live there will be live scores of each game provided on the web application also. The user demographic for this application tend to be people that follow football or in some cases interested in donating to the charity.

### Justification

> Why/when/where/how will it be useful?

The web application will cut the manual work done by the maintainer. By cutting out this work for the maintainer, it saves hours and hours of time as well as reducing the risk of human error when manually inputting data. It will provide users who are not familiar with football a better opportunity to progress further in the competition with the use of the team probabilities of winning on that current week. It will also give the competitors a visual representation of how many people are still in the league and what teams each person has picked for the given week. This was a big issue when speaking to the maintainers of the current competitions as they would receive a large number of messages per week asking how many people are left? How many people picked team X? etc.

### Programming language(s)

> List the proposed language(s) to be used.

* JavaScript
* Html
* CSS
* Python

### Programming tools / Tech stack

> Describe the compiler, database, web server, etc., and any other software tools you plan to use.

The project will be completely serverless. The reason for this is to allow for scalability and to be cost-effective as you are only paying for what you use. The majority of our architecture is going to be AWS services.

The services we are planning on using are the following:

* Authentication (Cognito)
* REST (API Gateway)
* Serverless actions (Lambda Functions)
* NoSQL (DynamoDB)
* Storage (S3 bucket)
* Monitoring (CloudWatch)
* Project Management (Amplify)
* Websockets

The following frameworks will be used:

* React
* Enzyme (Testing)

The following third-party API endpoints:

* Api-football
* Live-score-api

The following agile development tools:

* Jira (Sprint planning)

### Hardware

There will be no hardware requirements for this development.

### Learning Challenges

> List the main new things (technologies, languages, tools, etc) that you will have to learn.

Over the course of this development, we will encounter a number of new technologies/frameworks. The framework we will be learning for this project is React. Enzyme will also be used for midlevel testing of our front end design, this has never been used by either party. A number of new services/tools will all be used such as AWS services (API Gateway, Amplify, DynamoDB) and web sockets. We will also require extensive knowledge of third-party APIs so we can obtain the data required for the fixtures/results. In terms of the team's probabilities, it is an area in which neither of us have encountered before. Due to this, we will need to conduct our own research on this topic before creating the scripts to determine the win percentages of each team. We plan on implementing an agile work environment. To do so we will be using Jira, which will help with sprint management and communication between both parties in regards to tasks.

### Breakdown of work

The majority of the work we will do together. Pair Programming will be used throughout the development, as it is very beneficial for the standard of code. As most of these tasks will contain new learning opportunities, they will be tackled together to make sure we are both understanding the new tool/technology/framework. Each part of the development will be lead by a different team member. This ensures that each of us gets a chance to lead on a certain part of the development. Below is a breakdown of what task each student will lead on.

#### Student 1 (Tom Callaghan)

* Logged in/Logged out homepages
* Create / Join Leagues
* Locking of the league (Cloudwatch)
* Authentification of user (Cognito)
* Setting up API
* Amplify
* Probability Scripts


#### Student 2 (Philip Donnelly)

* User Sign In / Sign Up
* Fixtures / Results
* Players status in leagues
* Interacting with third party API's
* Lambda Functions
* DynamoDB set up
* Live Scores (Web Sockets)