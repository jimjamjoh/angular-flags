angular.module('$featureFlags', ['ngCookies']);

angular.module('$featureFlags').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when("/featureFlags",
      {
        controller: "$featureFlagsCtrl",
        templateUrl: "components/angular-flags/admin.html"
      }
  )
}]);

angular.module('$featureFlags').controller('$featureFlagsCtrl',
    ['$scope', '$featureFlagsFactory',
      function ($scope, $featureFlagsFactory) {
        $scope.flags = $featureFlagsFactory;
      }
    ]
);

angular.module('$featureFlags').factory('$featureFlagsFactory',
    ['$cookieStore',
      function ($cookieStore) {

        var flags = [];

        var initialise = function(initialFlags) {
          flags = initialFlags;
        };

        var writeCookie = function() {
          var cookieEntries = [];
          for (var idx in flags) {
            var flag = flags[idx];
            if (flag.override) {
              cookieEntries.push(flag.name + "=" + flag.override)
            }
          }
          $cookieStore.put("angularFlags", cookieEntries.join('|'));
        };

        var find = function (flagName) {
          for (var idx in flags) {
            if (flags[idx].name === flagName) {
              return flags[idx];
            }
          }
        };

        var applyCookieOverrides = function () {
          var rawCookie = $cookieStore.get("angularFlags");
          if (rawCookie) {
            var cookieFlags = rawCookie.split("|");
            for (var idx in cookieFlags) {
              var cookieFlag = cookieFlags[idx].split("="),
                  flagName = cookieFlag[0],
                  flagValue = cookieFlag[1],
                  flag = find(flagName);

              if (flag) {
                flag.override = flagValue;
              }
            }
          }
        };

        var disableOverride = function(flag) {
          flag.override = undefined;
          writeCookie();
        };

        var enableOverride = function(flag) {
          flag.override = flag.default;
          writeCookie();
        };

        var all = function () {
          applyCookieOverrides();
          return flags;
        };

        var on = function(flagName) {
          applyCookieOverrides();
          var flag = find(flagName);
          return flag && (flag.override ? flag.override === "on" : flag.default === "on");
        };

        var toggleOverride = function(flag) {
          if (flag.override) {
            disableOverride(flag);
          } else {
            enableOverride(flag);
          }
        };

        return {
          initialise: initialise,
          all: all,
          on: on,
          enableOverride: enableOverride,
          disableOverride: disableOverride,
          toggleOverride: toggleOverride,
          save: writeCookie
        };
      }
    ]
);
