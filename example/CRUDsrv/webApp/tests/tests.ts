
class TestVM1 {
    
    static assert 
    static done1

    static listener

    constructor() {
        
        QUnit.config.autostart = false
        
        QUnit.test("hello test", function (assert_) {
            TestVM1.assert = assert_;
            TestVM1.done1 = assert_.async();
            console.log('XXX testVM1')
            TestVM1.listener = defEventBus.addListener('onUData', TestVM1.onVM1Data);
            
        });

        QUnit.start()
    } //()

    static onVM1Data(data) {
        console.log('XXX data1');
        TestVM1.assert.ok(true, "Passed!");
        TestVM1.done1()
        // remove the first part of the test by removing the listener
        defEventBus.removeListener(TestVM1.listener)
    } //()


} //class

new TestVM1()

