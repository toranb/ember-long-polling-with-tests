var ADMIN_TICKET_FIXTURE = (function() {
    var factory = function() {
    };
    factory.prototype.list = function() {
        return [
            {id: 1, title: 'one'},
            {id: 2, title: 'two'},
            {id: 3, title: 'three'}
        ];
    };
    return factory;
})();

if (typeof window === 'undefined') {
    module.exports = new ADMIN_TICKET_FIXTURE();
} else {
    define('admin/vendor/fixtures/tickets', ['exports'], function (exports) {
        'use strict';
        return new ADMIN_TICKET_FIXTURE();
    });
}
