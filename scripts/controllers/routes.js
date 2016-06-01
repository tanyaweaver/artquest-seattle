page('/', homeController.index);
page('/about', aboutController.index);
page('/register', registerController.index);
page('/signin', signinController.index);
// page('/list+view', listViewController.index);
page('/one+day', listViewController.loadOneDayChallenge, listViewController.index, mapViewController.index);
page('/two+day', listViewController.loadTwoDayChallenge, listViewController.index, mapViewController.index);
page('/all+sites', listViewController.loadAllSites, listViewController.index, mapViewController.index);
page('/near+me', listViewController.loadSitesNearMe, listViewController.index, mapViewController.index);

page('/new+list', createListController.index);
// page('/map+view', mapViewController.index);
page();
