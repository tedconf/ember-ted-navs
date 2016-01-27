import Ember from 'ember';
import layout from '../templates/components/ted-nav-item';

const { capitalize } = Ember.String;
const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['Ted-nav-item'],

  route: null,
  label: null,

  routeLabel: computed('label', 'route', function() {
    return this.get('label') ? this.get('label') : capitalize(this.get('route'));
  }),

  /* Private */
  resolution: Ember.inject.service(),
  tagName: 'li',
  classNameBindings: [
    ':Ted-app-nav-item',
    'isActive:active'
    // 'isActive:Ted-app-nav-item--is-active',
    // 'isBecomingActive:Ted-app-nav-item--is-becoming-active'
  ],

  appNav: null,

  // currentRoute: computed.readOnly('appNav.currentRoute'),
  // nextRoute: computed.readOnly('appNav.nextRoute'),

  // isActive: computed('appNav.activeNavItem', 'appNav.emberRouter', function() {
  //   return this.get('appNav.activeNavItem') === this;
  // }),
  currentRouteName: computed.readOnly('appNav.emberRouter.currentRouteName'),
  isActive: computed('currentRouteName', function() {
    return this.get('currentRouteName') === this.get('route');
  }),

  isNotActive: computed.not('isActive'),

  width: computed('resolution.width', function() {
    this.get('resolution');
    return this.$().width();
  }),

  offset: computed('resolution.width', function() {
    this.get('resolution');
    return this.$().offset().left;
  }),

  // isBecomingActive: computed('route', 'nextRoute', 'isNotActive', function() {
  //   return this.get('isNotActive') && (this.get('route') === this.get('nextRoute'));
  // }),

  // click() {
  //   this.get('appNav').clickedNavItem(this);
  // },

  registerWithAppNav: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      let appNav = this.nearestWithProperty('_tedAppNav');
      this.set('appNav', appNav);
      appNav.registerNavItem(this);
    });
  })

});
