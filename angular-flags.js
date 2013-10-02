angular.module('$featureFlags', ['ngCookies']);

angular.module('$featureFlags').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when("/featureFlags",
      {
        controller: "$featureFlagsCtrl",
        template: '\
<h2><i>Feature flags console</i></h2> \
  <table cellpadding="10"> \
<tr ng-repeat="flag in flags.all()"> \
  <td> \
    <h3>{{flag.name}}</h3> \
  </td> \
  <td> \
    <span ng-hide="flag.override" style="color:grey"> \
      <input type="radio" ng-model="flag.default" name="{{flag.name}}-default" value="on" disabled/> on \
      <input type="radio" ng-model="flag.default" name="{{flag.name}}-default" value="off" disabled/> off \
    </span> \
    <span ng-show="flag.override"> \
      <input type="radio" ng-model="flag.override" name="{{flag.name}}-override" value="on" ng-change="flags.save()"/> on \
      <input type="radio" ng-model="flag.override" name="{{flag.name}}-override" value="off" ng-change="flags.save()"/> off \
    </span> \
  </td> \
  <td> \
    <input type="checkbox" ng-checked="flag.override" ng-click="flags.toggleOverride(flag)"/> override? \
  </td> \
</tr> \
</table>'
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
