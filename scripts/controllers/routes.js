page('/', homeController.index);
page('/about', aboutController.index);
page('/register', registerController.index);

// page('/registeredUser', createListController.displayOnRegistrationSignin);
page('/one+day', listController.loadOneDayChallenge, listController.index);
page('/two+day', listController.loadTwoDayChallenge, listController.index);
page('/all+sites', listController.loadAllSites, listController.index);
page('/near+me', listController.loadSitesNearMe, listController.index);

page('/new+list', createListController.index);

page();
