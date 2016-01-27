import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['Ted-nav-bar'],

  width: null,
  offset: null,

  attributeBindings: ['style'],
  classNameBindings: [
    'shouldFlash:Ted-nav-bar--should-flash',
    'shouldTransition:Ted-nav-bar--should-transition',
  ],

  currentRoute: Ember.computed.readOnly('applicationController.currentRouteName'),
  currentRouteHasLoadingTemplate: Ember.computed.match('currentRoute', /loading/),
  currentRouteHasNoLoadingTemplate: Ember.computed.not('currentRouteHasLoadingTemplate'),
  shouldFlash: Ember.computed.and('routerIsTransitioning', 'currentRouteHasNoLoadingTemplate'),

  style: Ember.computed('width', 'offset', function() {
    let width = this.get('width');
    let offset = this.get('offset');

    return `width: ${width}px;transform: translateX(${offset}px)`;
  }),

  setupAppController: Ember.on('init', function() {
    this.set('applicationController', this.container.lookup('controller:application'));
  }),

  setupIsTransitioning: Ember.on('init', function() {
    let router = this.container.lookup('router:main');
    this.set('router', router);

    router.on('willTransition.tedAppNavBar', () => {
      this.set('routerIsTransitioning', true);
    });

    router.on('didTransition.tedAppNavBar', () => {
      this.set('routerIsTransitioning', false);
    });
  }),

  teardownIsTransitioning: Ember.on('willDestroyElement', function() {
    this.get('router').off('willTransition.tedAppNavBar');
    this.get('router').off('didTransition.tedAppNavBar');
  }),

  /*
    We enable transitions on the bar after the first render, since the bar needs to know
    info from the DOM to set its position. If transitions are always enabled, there's
    a flash of animations on load.
  */
  enableTransitionsAfterInitialRender: Ember.on('didInsertElement', function() {
    Ember.run.next(() => {
      this.set('shouldTransition', true);
    });
  })

});
