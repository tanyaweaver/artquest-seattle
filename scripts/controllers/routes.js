page('/', navController.displayHome);
page('/about', navController.displayAbout);
page('/register', navController.displayRegister);
page('/one+day', listController.loadOneDayChallenge, listController.index);
page('/two+day', listController.loadTwoDayChallenge, listController.index);
page('/near+address', listView.getAddress, Locations.sitesNearAddress, listController.index);
page('/signedin', pageView.displayOnRegistrationSignin);
page('/new+list', pageView.createNewQuest);
page('/see+all+quests',pageView.showAllQuests);

page();
