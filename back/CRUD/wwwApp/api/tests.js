console.log('tests script');
var pro = loadQunit();
pro.then(function () {
    console.log('qunit loaded');
    QUnit.start();
    new TestVM1();
});
var TestVM1 = (function () {
    function TestVM1() {
        console.log('testVM1');
        DeventBus.addListener('onUData', TestVM1.onVM1Data);
        depp.define({ 'vm1': '/api/UsersVM.js' });
        depp.require('vm1');
        QUnit.test("hello test", function (assert_) {
            TestVM1.assert = assert_;
            TestVM1.done1 = assert_.async();
        });
    }
    TestVM1.onVM1Data = function (data) {
        console.log('data');
        TestVM1.assert.ok(true, "Passed!");
        TestVM1.done1();
    };
    return TestVM1;
}());
