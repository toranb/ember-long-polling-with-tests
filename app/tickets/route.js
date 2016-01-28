import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    repository: inject('ticket'),
    poller: Ember.inject.service('poller'),
    afterModel() {
        const poller = this.get('poller');
        const repository = this.get('repository');
        poller.start(this, function() {
            repository.find();
        });
    },
    actions: {
        willTransition() {
            const poller = this.get('poller');
            poller.stop();
        }
    },
    model: function() {
        const repository = this.get('repository');
        return repository.find();
    }
});
