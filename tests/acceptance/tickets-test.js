import Ember from 'ember';
import { test } from 'qunit';
import tickets from 'admin/vendor/fixtures/tickets';
import module from 'admin/tests/helpers/module';
import startApp from 'admin/tests/helpers/start-app';

var application;

module('Acceptance: Tickets', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('list endpoint will show all tickets', function(assert) {
    ajax('/api/tickets', 'GET', 200, tickets.list());
    visit('/tickets');
    andThen(function() {
        assert.equal(currentURL(), '/tickets');
        assert.equal(find('.ticket-list-item').length, 3);
        assert.equal(find('.list-detail-link:eq(0)').text(), tickets.list()[0].title);
        assert.equal(find('.list-detail-link:eq(1)').text(), tickets.list()[1].title);
        assert.equal(find('.list-detail-link:eq(2)').text(), tickets.list()[2].title);
    });
});

test('clicking the details link should load up the detail view', function(assert) {
    ajax('/api/tickets', 'GET', 200, tickets.list());
    visit('/tickets');
    click('.list-detail-link:eq(0)');
    andThen(function() {
        assert.equal(currentURL(), '/tickets/1');
        assert.equal(find('.detail-title').text(), tickets.list()[0].title);
    });
});
