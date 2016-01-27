import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('talks');
  this.route('users');
  this.route('conferences');
  this.route('settings');
});

export default Router;
