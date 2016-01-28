import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    applicationAction() {
      alert('Action from the application controller');
    }
  }

});
