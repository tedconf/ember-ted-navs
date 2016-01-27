import Ember from 'ember';
import layout from '../templates/components/ted-subnav-item';

const TedSubnavItem = Ember.Component.extend({
  layout,
  tagName: 'li',
  classNames: ['Ted-subnav-item'],
  classNameBindings: ['right:pull-right'],

  actions: {
    handleOnClick() {
      this.get('onClick')();
    }
  }
});

TedSubnavItem.reopenClass({ positionalParams: 'params' });

export default TedSubnavItem;
