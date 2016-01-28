import Ember from 'ember';
import config from 'admin/config/environment';

export default Ember.Service.extend({
    time: config.DEFAULT_POLL_INTERVAL,
    running: null,
    start: function(context, func) {
        this.set('running', this.schedule(context, func));
    },
    stop: function() {
        Ember.run.cancel(this.get('running'));
    },
    schedule: function(context, func) {
        return Ember.run.later(this, function() {
            this.set('running', this.schedule(context, func));
            func.apply(context);
        }, this.get('time'));
    },
    setInterval: function(time) {
        this.set('time', time);
    }
});
