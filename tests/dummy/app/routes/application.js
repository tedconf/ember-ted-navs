import Ember from "ember";

export default Ember.Route.extend({
  actions: {
    routeAction() {
      alert('Action from the application route');
    }
  }

});
