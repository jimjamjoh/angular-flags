(function () {
  "use strict";

  describe('$featureFlagsFactory', function() {
    var featureFlags,
        defaultFlags = [
          {'name': 'taco', 'default':'off'},
          {'name': 'burrito', 'default':'on'}
        ],
        grabFlag = function(flagName, allFlags) {
          for (var idx in allFlags) {
            if (allFlags[idx].name === flagName) {
              return allFlags[idx];
            }
          }
        };

    beforeEach(function() {
      module('$featureFlags');
      module('ngCookies');
    });

    beforeEach(inject(function($featureFlagsFactory) {
      featureFlags = $featureFlagsFactory;
      featureFlags.initialise(defaultFlags);
    }));

    afterEach(inject(function($cookieStore){
      $cookieStore.remove('angularFlags');
    }));

    describe('when no overrides are set', function() {

      it('should return default values', function() {
        expect(featureFlags.on('taco')).toBeFalsy();
        expect(featureFlags.on('burrito')).toBeTruthy();
      });

      it('should be falsy when flag unknown', function() {
        expect(featureFlags.on('unknown flag')).toBeFalsy();
      });
    });

    describe('when toggling the override', function() {
      var tacoFlag, burritoFlag;
      beforeEach(function() {
        tacoFlag = grabFlag('taco', featureFlags.all());
        burritoFlag = grabFlag('burrito', featureFlags.all());
      })

      describe('and no cookie override set', function() {
        it('should set the cookie override value equal to the default',inject(function($cookieStore) {
          featureFlags.toggleOverride(tacoFlag);
          expect($cookieStore.get('angularFlags')).toBe("taco=off");
          featureFlags.toggleOverride(burritoFlag);
          expect($cookieStore.get('angularFlags')).toContain("burrito=on");
        }));
      });

      describe('and cookie override set', function() {
        beforeEach(inject(function($cookieStore) {
          featureFlags.enableOverride(tacoFlag);
          featureFlags.enableOverride(burritoFlag);
        }));
        it('should unset the cookie override', inject(function($cookieStore) {
          featureFlags.toggleOverride(tacoFlag);
          expect($cookieStore.get('angularFlags')).not.toContain('taco');
          featureFlags.toggleOverride(burritoFlag);
          expect($cookieStore.get('angularFlags')).not.toContain('burrito');
        }));
      });
    });

    describe('when flags are changed with overrides', function() {

      beforeEach(inject(function($cookieStore){
        $cookieStore.put('angularFlags', 'taco=on|burrito=off');
      }));

      it('should return the override value', function() {
        expect(featureFlags.on('taco')).toBeTruthy();
        expect(featureFlags.on('burrito')).toBeFalsy();
      });

    });
  });
}());
