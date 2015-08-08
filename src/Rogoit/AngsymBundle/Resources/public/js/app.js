/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "/bundles/rogoitangsym/views/dashboard.html",
            data: {pageTitle: 'Dashboard', pageSubTitle: 'statistics & reports'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    console.log('right here');
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/morris/morris.css',
                            '/bundles/rogoitangsym/assets/admin/pages/css/tasks.css',
                            
                            '/bundles/rogoitangsym/assets/global/plugins/morris/morris.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/morris/raphael-min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery.sparkline.min.js',

                            '/bundles/rogoitangsym/assets/admin/pages/scripts/index3.js',
                            '/bundles/rogoitangsym/assets/admin/pages/scripts/tasks.js',

                             '/bundles/rogoitangsym/js/controllers/DashboardController.js'
                        ] 
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "/bundles/rogoitangsym/views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload', pageSubTitle: 'angularjs file upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "/bundles/rogoitangsym/views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select', pageSubTitle: 'select2 written in angularjs'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            '/bundles/rogoitangsym/js/controllers/UISelectController.js'
                        ] 
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "/bundles/rogoitangsym/views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap', pageSubTitle: 'bootstrap components written in angularjs'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "/bundles/rogoitangsym/views/tree.html",
            data: {pageTitle: 'jQuery Tree View', pageSubTitle: 'tree view samples'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            '/bundles/rogoitangsym/assets/global/plugins/jstree/dist/jstree.min.js',
                            '/bundles/rogoitangsym/assets/admin/pages/scripts/ui-tree.js',
                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })     

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "/bundles/rogoitangsym/views/form_tools.html",
            data: {pageTitle: 'Form Tools', pageSubTitle: 'form components & widgets sample'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/typeahead/typeahead.css',

                            '/bundles/rogoitangsym/assets/global/plugins/fuelux/js/spinner.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            '/bundles/rogoitangsym/assets/global/plugins/typeahead/handlebars.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            '/bundles/rogoitangsym/assets/admin/pages/scripts/components-form-tools.js',

                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })        

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "/bundles/rogoitangsym/views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers', pageSubTitle: 'date, time, color, daterange pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/clockface/css/clockface.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/clockface/js/clockface.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            '/bundles/rogoitangsym/assets/admin/pages/scripts/components-pickers.js',

                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "/bundles/rogoitangsym/views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns', pageSubTitle: 'select2 & bootstrap select dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.css',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery-multi-select/css/multi-select.css',

                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',

                            '/bundles/rogoitangsym/assets/admin/pages/scripts/components-dropdowns.js',

                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        }) 

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/advanced.html",
            templateUrl: "/bundles/rogoitangsym/views/datatables/advanced.html",
            data: {pageTitle: 'Advanced Datatables', pageSubTitle: 'advanced datatables samples'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.css',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/all.min.js',
                            '/bundles/rogoitangsym/js/scripts/table-advanced.js',

                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "/bundles/rogoitangsym/views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables', pageSubTitle: 'ajax datatables samples'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.css',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/css/datepicker.css',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',

                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/datatables/all.min.js',

                            '/bundles/rogoitangsym/assets/global/scripts/datatable.js',
                            '/bundles/rogoitangsym/js/scripts/table-ajax.js',

                            '/bundles/rogoitangsym/js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "/bundles/rogoitangsym/views/profile/main.html",
            data: {pageTitle: 'User Profile', pageSubTitle: 'user profile sample'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            '/bundles/rogoitangsym/assets/admin/pages/css/profile.css',
                            '/bundles/rogoitangsym/assets/admin/pages/css/tasks.css',
                            
                            '/bundles/rogoitangsym/assets/global/plugins/jquery.sparkline.min.js',
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            '/bundles/rogoitangsym/assets/admin/pages/scripts/profile.js',

                            '/bundles/rogoitangsym/js/controllers/UserProfileController.js'
                        ]                    
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "/bundles/rogoitangsym/views/profile/dashboard.html",
            data: {pageTitle: 'User Profile', pageSubTitle: 'user profile dashboard sample'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "/bundles/rogoitangsym/views/profile/account.html",
            data: {pageTitle: 'User Account', pageSubTitle: 'user profile account sample'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "/bundles/rogoitangsym/views/profile/help.html",
            data: {pageTitle: 'User Help', pageSubTitle: 'user profile help sample'}      
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "/bundles/rogoitangsym/views/todo.html",
            data: {pageTitle: 'Todo', pageSubTitle: 'user todo & tasks sample'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({ 
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.css',
                            '/bundles/rogoitangsym/assets/admin/pages/css/todo.css',
                            
                            '/bundles/rogoitangsym/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            '/bundles/rogoitangsym/assets/global/plugins/select2/select2.min.js',

                            '/bundles/rogoitangsym/assets/admin/pages/scripts/todo.js',

                            '/bundles/rogoitangsym/js/controllers/TodoController.js'
                        ]                    
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);