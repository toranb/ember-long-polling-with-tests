import Ember from 'ember';
import inject from 'admin/utilities/inject';

export default Ember.Route.extend({
    repository: inject('ticket'),
    model: function() {
        const repository = this.get('repository');
        return repository.find();
    }
});
