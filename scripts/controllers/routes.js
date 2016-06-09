page('/', navController.displayHome);
page('/about', navController.displayAbout);
page('/register', navController.displayRegister);
page('/one+day', listController.loadOneDayChallenge, listController.displayAndSaveQuest);
page('/two+day', listController.loadTwoDayChallenge, listController.displayAndSaveQuest);
page('/near+address', listView.getAddress, Locations.sitesNearAddress, listController.displayAndSaveQuest);
page('/near+me', listView.getAddress, Locations.sitesNearMe, listController.displayAndSaveQuest);
page('/signedin', pageView.displayOnRegistrationSignin);
page('/new+list', pageView.createNewQuest);
page('/see+all+quests',pageView.showAllQuests);
page('/hamburgler', navController.menuShow);

page();
