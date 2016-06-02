page('/', homeController.index);
page('/about', aboutController.index);
page('/register', registerController.index);

// page('/registeredUser', createListController.displayOnRegistrationSignin);
page('/one+day', listController.loadOneDayChallenge, listController.index);
page('/two+day', listController.loadTwoDayChallenge, listController.index);
page('/registered+signedin', createListController.displayOnRegistrationSignin);
page('/new+list', createListController.createNewQuest);
page('/see+all+quests', createListController.showAllQuests);

page();
