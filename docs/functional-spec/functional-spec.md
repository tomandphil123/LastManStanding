# Functional Specification
## CA400 4th Year Project
**Philip Donnelly & Tom Callaghan**

******
## Table of Contents:

 1. **Introduction**
	 * 1.1. Overview
	 * 1.2 Business Context
	 * 1.3 Glossary
2. **General Description**
	* 2.1 Product / System Functions
	* 2.2 User Characteristics and Objectives
	* 2.3 Operational Scenarios
	* 2.4 Constraints
3. **Functional Requirements**
	* 3.1 Authentication Flow
	* 3.2 Joining / Creating Leagues
	* 3.3 League Functionality (Team Selection / Elimination)
	* 3.4 Top Probability
	* 3.5 Live Scores
4. **System Architecture**
	* 4.1 
	* 4.2 
	* 4.3 
	* 4.4 
5. **High Level Design**
	* 5.1 High Level Design Diagrams
	* 5.2 High Level Design Description
	* 5.3 Top Level Context Diagram
	* 5.4 Data Flow Diagram
6. **Preliminary Schedule**
	* 6.1 Preliminary Schedule Description
	* 6.2 Gantt Chart
7. **Appendicies**
******
# 1. Introduction

## 1.1 Overview
The overview of our project _LastManStanding_ is to create a fully automated version of the well-known competition "Last Man Standing". _LastManStanding_ is a league based game where players pick a Premier League team each week to represent them for that week. If the player’s team wins their game against the opposition, the player proceeds to next week's stage. If the player’s team of choice loses or draws against their opposition, the player is knocked out and cannot continue onto the next stage.

## 1.2 Business Context
There are several business contexts that our project could undertake. After looking at similar services we have identified three business contexts which are:

**Paywall:** _LastManStanding_ could have a business model where a user has access to joining 1 league and if they want to create or join more leagues they must pay a subscription-based fee each month to access the full service.

**Advertisements:** _LastManStanding_ could be a service where it generates money through advertisements. With soccer being a multi-billion euro enterprise companies would be able to advertise their businesses on the site, targeting a specific client in the process.

**Buy Outright:** Before creating an account for _LastManStanding_ users must pay an outright fee for the service and once paid the user can use the site as much as they want.

**Percentage Cut:** _LastManStanding_ could implement and cut off the top method. For this, a league would have a buy-in, for example, €5. Each user pays the €5 into the league and the winner of the league takes all of the money. _LastManStanding_ could take a percentage of the pot for each league for example if the league pot was €50 and _LastManStanding_ takes 10% of the pot the user will receive €45 and _LastManStanding_ takes €5.

## 1.3 glossary

**Technical:**
- AWS - Amazon Web Services
Third Party API Enpoints
Serverless
database

**Services:**
AWS Cognito

**General:**

# General Description:

## 2.1 Product / System Functions
### Leagues
Within _LastManStanding_ there will be a large number of leagues. These leagues will be set up by the competition's users. Users will have the option to either create or join leagues, once they are signed in. The user who creates the league will be given a code that is specific to the given league. Once the league is set up successfully, users can join the league using the code provided by the league owner. This code will be entered into the "Join League" section, and the user will appear in the league. Users will have one week to join the league or once the first round of team selection begins the league will be locked and ready to start.

The users will be allowed to pick from all teams within the Premier League in the first week. When a player picks a team, they will not be able to pick that team for the rest of the competition. The only scenario where a player can pick the team for a second time is if they have picked all the available teams within the one competition. Users will be able to change their picked team up until the night before the first kick-off in the Premier League. At this point, the league will be locked until all Premier League matches of that week have been completed. Once all matches are completed, the users that picked a team that lost or drew their match will be knocked out of the competition. The users that picked a winning team will progress to the next game week. If all users are knocked out, the league will be reset and everyone will restart will all teams available.

### News & Updates
Users will be able to keep up to date with the Premier League. Fixtures, results and news updates will be displayed on the front page of the web application. This way the users will be able to keep track of each team's progress and form. This will help make team selections for the following weeks.

### Probability
To accommodate for users that may only be participating in the competition for charity reasons or if they have no knowledge of the Premier League, there will a probability of each team winning calculated every week. This will help them to participate in the competition by aiding in their team selection thus having a chance to win.

### Live Scores
During a game weekend when matches are underway there will be live scores visible during live games. The live score will be a basic score display of both teams and the minute in the match. Users can keep an eye on the live scores to get an idea if they'll progress to the next round. The live scores will be updated every two minutes during a match giving users a speedy update in relation to the team choice.

## 2.2 User Characteristics and Objectives
### User Demographic
Last Man Standing is a game played by many different groups of people. From charity run competitions to work communities. Therefore, the user demographic for _LastManStanding_ web application will be football fans that currently run this competition using Excel sheets or any other manual processes. Although the demographic is mostly football fans, users that get involved with no knowledge of the Premier league are also within the demographic.

### User Expectations
It is expected that the majority of the users will have some level of knowledge of the Premier League. From research, we found that there is a number of users with no knowledge of the Premier League. In order to accommodate these users, some features will be added to the web application in order to aid these sorts of users, in making educated team selections.

## 2.3 Operational Scenarios
### User Sign Up / Sign In
When a user first enters _LastManStanding_ web application they will be greeted on the home page. This will explain what _LastManStanding_ is. On the top right users will have an option to sign in or sign up.

If this is a user first time using _LastManStanding_ they will be required to sign up. Once they click the signup button a form will be displayed requiring the user to enter a new username, their email and a new password. Once submitted, the user will be required to confirm their email. This will be done by clicking a link which _LastManStanding_ has sent to their email.

If the user is a previous user of _LastManStanding_ they will simply need to sign-in. For this the user will click the sign-in button, then the sign in option will display. A user will simply enter the username they created their account with as well as their password. Once signed in the user will be redirected to the logged-in user interface.

### League Creation / Join
To join or create a league a user must be signed in. A user will click the 'My Leagues' tab in the navigation bar. This will bring them to their league's page. On their league's page, it will display all of their current leagues.

On the top of the page, the user will have the option to join a league. This will display a simple input box in which they enter the invitation code they received from the league owner. Once submitted, the new league will be displayed in their 'My Leagues' tab.

Similar to the league join if a user wants to create a league the option to do so will be on the top of the 'My Leagues' tab. The user will click the 'create league' button. This will display an input field where they enter the name of their new league. They simply click 'create league' and the league will be displayed in their 'My leagues' section. The league creator will receive an email with the invitation code for them to distribute to who they wish. The invitation code will also be visible on the top of the league they created.

## 2.4 Constraints
### Site Speed
As the site will have a lot of different features/components, the site speed will be a constraint. A main contributor to slow site speed are images. In order to ensure the site speed is timely, all images being displayed will be compressed before uploading to the site.

### Accessibility
As the site will be used by a large number of users, it must be very accessible. In order to ensure that the site is accessible a number of tools will be used such as Lighthouse. The library we are using for design is MaterialUI, this has built-in accessibility.

### Cost
_LastManStanding_ will require many different aws services and third party API endpoints. Due to this, there will be a monthly cost for running _LastManStanding_. We plan on using serverless architecture to reduce the cost of running _LastManStanding_.

### Time
Time is a large constraint for _LastManStanding_. The web application requires a lot of different services. In order for _LastManStanding_ to be a worthwhile service for users, we need to implement a number of features which aids with the enjoyment of playing _LastManStanding_ such as the probability and live scores features.

# Functional Requirements:

## 3.1 Authentication flow
### Description
The authentication flow is when a user signs in or signs up. It will user AWS Cognito to help create users and authenticate users signing in. When a user creates an account a post request will be sent to AWS Cognito with their username, email and password. These details will be saved into our user pool. When signing in, a post request will be sent to the user pool with the user's username and password. AWS Cognito will check these credentials against users in the pool and return access and an ID token to the user if successful. The user has now logged in.

![Cognito Data Flow](./images/Cognito.png)

### Criticality
This is a high criticality requirement. Without the authentication flow users would not be able to sign in to _LastManStanding_ thus not being able to join or create leagues.

### Technical issues
Some technical issues with the authentication flow are getting AWS Cognito set up correctly and introducing error handling. We need to set up AWS Cognito specific to our needs which requires a lot of research and being particular with the service. After AWS Cognito is set up we need to implement correct error handling for all circumstances that a user may encounter which could cause issues.

### Dependencies with Other Requirements
There are no other dependencies on any other requirements.

## 3.2 Join / Create Leagues
### Description
The join / create leagues functionality is encountered when the user navigates to the "My leagues" tab. They will be prompted to either join or create leagues, as well as the leagues they have already joined. When creating a league the user will input the name of the league, they will then receive a league code. This code will be given to other users in order to join the league. When the user wants to join a league they have to retrieve the code from the league owner. Once they have the code they will be added into the league.

### Criticality
This is a criticality requirement. Without this requirement / functionality the users would not be able to get involved in the competition.

### Technical issues


### Dependencies with Other Requirements