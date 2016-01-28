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
    $clone.removeClass('ember-view');

    let $previousSibling = this.$().prev();
    let $parent = this.$().parent();

    Ember.run.schedule('afterRender', () => {
      if (this.get('shouldAnimateOut')) {
        if ($previousSibling.length) {
          $previousSibling.after($clone);
        } else {
          $parent.prepend($clone);
        }

        this.animateOut($clone);
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

    this.$().removeClass('Ted-subnav--should-transition');
    this.$().css('max-height', 0);

    Ember.run.next(() => {
      this.$().addClass('Ted-subnav--should-transition');
      this.$().css('max-height', '200px');
    });
  },

  animateOut($clone) {
    // Note: this duration has to match the transition time in ted-subnav.scss
    let duration = 300;
    let offset = $clone.outerHeight();
    let $mainContent = Ember.$('.Ted-subnav-wrapper__inner');

    $clone.addClass('Ted-subnav--should-transition');
    $clone.css('max-height', '0');

    Ember.run.later(() => {
      $clone.remove();
    }, duration);
  }

});
