import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  layout: hbs`
    {{#each model as |ticket|}}
      <div class="ticket-list-item">{{#link-to "tickets.detail" ticket.id class="list-detail-link"}}{{ticket.title}}{{/link-to}}</div>
    {{/each}}
    {{outlet}}
  `
});
