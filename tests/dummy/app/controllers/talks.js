import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    localAction() {
      alert('Action from a local controller');
    }
  }

});
