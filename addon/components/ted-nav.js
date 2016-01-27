import Ember from 'ember';
import layout from '../templates/components/ted-nav';

export default Ember.Component.extend({
  layout,

  _tedAppNav: true,

  subnavState: Ember.inject.service('ted-subnav-state'),
  resolution: Ember.inject.service(),
  tagName: 'ul',
  classNames: ['Ted-nav nav nav-flaps'],
  inDOM: false,

  navOffset: Ember.computed('inDOM', 'resolution.width', function() {
    if (this.get('inDOM')) {
      return this.$().offset().left;
    } else {
      return 0;
    }
  }),

  activeNavItemOffset: Ember.computed.readOnly('activeNavItem.offset'),
  activeItemOffset: Ember.computed('navOffset', 'activeNavItemOffset', function() {
    let navOffset = this.get('navOffset');

    return this.get('activeNavItemOffset') - navOffset;
  }),

  // clickedNavItem(navItem) {
  //   this.set('activeNavItem', navItem);
  // },

  // updateActiveNavItem: Ember.observer('emberRouter.currentRouteName', function() {
  //   this.set
  //   debugger;
  // }),

  setInitialState: Ember.on('init', function() {
    this.set('navItems', Ember.A());

    // Dummy get to "initialize" resolution service
    this.get('resolution.width');

    this.set('applicationController', this.container.lookup('controller:application'));
  }),

  registerNavItem(item) {
    this.get('navItems').pushObject(item);

    // Set initial active item
    let currentPath = this.get('applicationController.currentPath');
    if (currentPath.indexOf(item.get('route')) === 0) {
      this.set('activeNavItem', item);
    }
  },

  updateInDOM: Ember.on('didInsertElement', function() {
    this.set('inDOM', true);

    // Indicate we've rendered, to let subnavs know they can start animating
    Ember.run.next(() => {
      this.set('subnavState.tedNavHasRendered', true);
    });
  }),

  stealRouter: Ember.on('init', function() {
    const router = this.container.lookup('router:main');
    this.set('emberRouter', router);
  }),


});
