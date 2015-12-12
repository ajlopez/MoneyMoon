
var loanService = require('../../services/loan');

var loanId;

exports['clear loans'] = function (test) {
    test.async();
    
    loanService.clearLoans(function (err, data) {
        test.ok(!err);
        test.done();
    });
};

exports['add loan'] = function (test) {
    test.async();
    
    loanService.addLoan({ user: 1, amount: 1000 }, function (err, id) {
        test.ok(!err);
        test.ok(id);
        loanId = id;
        test.done();
    });
};

exports['get loan by id'] = function (test) {
    test.async();
    
    loanService.getLoanById(loanId, function (err, loan) {
        test.ok(!err);
        test.ok(loan);
        test.equal(typeof loan, 'object');
        
        test.equal(loan.user, 1);
        test.equal(loan.id, loanId);
        
        test.done();
    });
};

exports['get unknown loan by id'] = function (test) {
    test.async();
    
    loanService.getLoanById(0, function (err, loan) {
        test.ok(!err);
        test.strictEqual(loan, null);
        
        test.done();
    });
};

exports['get loans by user'] = function (test) {
    test.async();
    
    loanService.getLoansByUser(1, function (err, loans) {
        test.ok(!err);
        test.ok(loans);
        test.ok(Array.isArray(loans));
        test.equal(loans.length, 1);
        
        test.equal(loans[0].user, 1);
        test.equal(loans[0].id, loanId);
        
        test.done();
    });
};

exports['get loan by unknown user'] = function (test) {
    test.async();
    
    loanService.getLoansByUser(0, function (err, loans) {
        test.ok(!err);
        test.ok(loans);
        test.ok(Array.isArray(loans));
        test.equal(loans.length, 0);
        
        test.done();
    });
};

exports['get loans'] = function (test) {
    test.async();
    
    loanService.getLoans(function (err, loans) {
        test.ok(!err);
        test.ok(loans);
        test.ok(Array.isArray(loans));
        test.equal(loans.length, 1);
        
        test.equal(loans[0].user, 1);
        test.equal(loans[0].id, loanId);
        
        test.done();
    });
};

exports['update loan data'] = function (test) {
    test.async();
    
    loanService.updateLoan(loanId, { name: 'A loan' }, function (err, id) {
        test.ok(!err);
        test.ok(id);
        test.equal(id, loanId);
        
        loanService.getLoanById(loanId, function (err, loan) {
            test.ok(!err);
            test.ok(loan);
            test.equal(loan.id, loanId);
            test.equal(loan.name, 'A loan');
            test.equal(loan.user, 1);
            
            test.done();
        });
    });
};

