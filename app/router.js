import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('detail', { path: "/:user_id" });
  });
  this.route('tickets', function() {
    this.route('detail', { path: "/:ticket_id" });
  });
});

export default Router;
