import Ember from 'ember';

var TicketDeserializer = Ember.Object.extend({
    deserialize(response) {
        let store = this.get('store');
        response.forEach(function(json) {
            store.push('ticket', json);
        });
    }
});

export default TicketDeserializer;
