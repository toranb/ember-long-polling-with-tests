import Ember from 'ember';
import inject from 'admin/utilities/deserializer';
import PromiseMixin from 'ember-promise/mixins/promise';

export default Ember.Object.extend({
    deserializer: inject('ticket'),
    find: function() {
        let store = this.get('store');
        PromiseMixin.xhr('/api/tickets').then(response => {
            this.get('deserializer').deserialize(response);
        });
        return store.find('ticket');
    }
});
