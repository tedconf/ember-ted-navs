import Ember from 'ember';

export default Ember.Service.extend({

  tedNavHasRendered: false,
  subNavBecomingActive: null,
  subNavBecomingInactive: false

});
