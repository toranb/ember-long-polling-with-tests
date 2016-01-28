import Ember from 'ember';
import { test } from 'qunit';
import tickets from 'admin/vendor/fixtures/tickets';
import module from 'admin/tests/helpers/module';
import startApp from 'admin/tests/helpers/start-app';

var application, service, schedule, polls;

module('Acceptance: Tickets with polling', {
    beforeEach: function() {
        application = startApp();
        polls = 0;
        service = application.__container__.lookup('service:poller');
        schedule = service.schedule;
        service.schedule = function() {
            polls = polls + 1;
            if(polls === 2) {
                return application.testHelpers.wait().then(() => {
                    setTimeout(() => {
                        schedule.apply(this, arguments);
                    }, 50);
                });
            }
            if(polls > 2) {
                return;
            }
            return schedule.apply(this, arguments);
        };
    },
    afterEach: function() {
        service.schedule = schedule;
        Ember.run(application, 'destroy');
    }
});

test('list endpoint will continue to poll for updates and add to the list of tickets', function(assert) {
    var done = assert.async();
    const first = tickets.list();
    const second = tickets.list().concat({id: 4, title: 'four'});
    ajax('/api/tickets', 'GET', 200, first);
    visit('/tickets');
    andThen(function() {
        assert.equal(currentURL(), '/tickets');
        assert.equal(find('.ticket-list-item').length, 3);
        assert.equal(find('.list-detail-link:eq(0)').text(), tickets.list()[0].title);
        assert.equal(find('.list-detail-link:eq(1)').text(), tickets.list()[1].title);
        assert.equal(find('.list-detail-link:eq(2)').text(), tickets.list()[2].title);
    });
    ajax('/api/tickets', 'GET', 200, second);
    setTimeout(function() {
        assert.equal(find('.ticket-list-item').length, 4);
        done();
    }, 500);
});
