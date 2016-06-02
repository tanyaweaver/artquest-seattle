page('/', homeController.index);
page('/about', aboutController.index);
page('/register', registerController.index);
page('/one+day', listController.loadOneDayChallenge, listController.index);
page('/two+day', listController.loadTwoDayChallenge, listController.index);
page('/registered+signedin', pageView.displayOnRegistrationSignin);
page('/new+list', pageView.createNewQuest);
page('/see+all+quests',pageView.showAllQuests);

page();
