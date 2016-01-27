import Ember from 'ember';
import layout from '../templates/components/ted-subnav';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['Ted-subnav'],

  subnavState: Ember.inject.service('ted-subnav-state'),

  isNotBecomingInactive: computed.not('subnavState.subNavBecomingInactive'),
  shouldAnimateIn: computed.and('isNotBecomingInactive', 'subnavState.tedNavHasRendered'),
  shouldAnimateOut: computed.not('subnavState.subNavBecomingActive'),

  handleInsertingElement: Ember.on('didInsertElement', function() {
    const subnavState = this.get('subnavState');
    subnavState.set('subNavBecomingActive', true);

    Ember.run.schedule('afterRender', () => {
      if (this.get('shouldAnimateIn')) {
        this.animateIn();
      }
    });

    Ember.run.next(() => {
      if ( !(subnavState.get('isDestroyed') || subnavState.get('isDestroying')) ) {
        subnavState.set('subNavBecomingActive', false);
      }
    });
  }),

  handleRemovingElement: Ember.on('willDestroyElement', function() {
    const subnavState = this.get('subnavState');
    subnavState.set('subNavBecomingInactive', true);

    let $clone = this.$().clone();
    $clone.removeAttr('id');
    this.$().parent().prepend($clone);

    Ember.run.schedule('afterRender', () => {
      if (this.get('shouldAnimateOut')) {
        this.animateOut($clone);
      } else {
        $clone.remove();
      }
    });

    Ember.run.next(() => {
      if ( !(subnavState.get('isDestroyed') || subnavState.get('isDestroying')) ) {
        subnavState.set('subNavBecomingInactive', false);
      }
    });
  }),

  animateIn() {
    let $mainContent = Ember.$('.Ted-subnav-wrapper__inner');
    let offset = this.$().outerHeight();

    $mainContent.removeClass('Ted-subnav-wrapper__inner--should-transition');
    $mainContent.css('transform', `translateY(-${offset}px)`);

    Ember.run.next(() => {
      $mainContent.addClass('Ted-subnav-wrapper__inner--should-transition');
      $mainContent.css('transform', `translateY(0)`);
    });
  },

  animateOut($clone) {
    // Note: this duration has to match the transition time in ted-subnav.scss
    let duration = 200;
    let offset = $clone.outerHeight();
    let $mainContent = Ember.$('.Ted-subnav-wrapper__inner');

    $mainContent.addClass('Ted-subnav-wrapper__inner--should-transition');
    $mainContent.css('transform', `translateY(-${offset}px)`);

    Ember.run.later(() => {
      $mainContent.removeClass('Ted-subnav-wrapper__inner--should-transition');
      $clone.remove();
      $mainContent.css('transform', `translateY(0px)`);
    }, duration);
  }

});
