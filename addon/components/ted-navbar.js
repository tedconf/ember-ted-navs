import Ember from 'ember';
import layout from '../templates/components/ted-navbar';

export default Ember.Component.extend({
  layout,
  tagName: 'header',
  classNames: ['Ted-navbar navbar navbar-default'],
});
