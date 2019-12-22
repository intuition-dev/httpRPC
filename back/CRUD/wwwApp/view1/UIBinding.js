console.log('UI:');
var UIBinding = (function () {
    function UIBinding() {
        this.setupBut();
    }
    UIBinding.prototype.setupBut = function () {
        document.getElementById("srchBut").addEventListener("click", function () {
            var srch = document.getElementById('srchFld').value;
            console.log('klk', srch);
            if (UIBinding.userLst)
                UIBinding.userLst.clear();
            var arg = {};
            arg.srch = srch;
            arg.o = 1;
            DeventBus.dispatch('uFetch', arg);
        });
        DeventBus.addListener('onUData', UIBinding.onData);
    };
    UIBinding.onData = function (data) {
        console.log('onData');
        var options = {
            valueNames: ['fname', 'lname', 'email', 'phone'],
            item: "<tr> \n               <td class=\"fname\"></td>\n               <td class=\"lname\"></td>\n               <td class=\"email\"></td>\n               <td class=\"phone\"></td>\n            </tr>"
        };
        if (!(UIBinding.userLst)) {
            var userLstEl = document.getElementById('userLst');
            UIBinding.userLst = new List(userLstEl, options, data);
        }
        else {
            UIBinding.userLst.add(data);
        }
        console.log('listjs');
    };
    return UIBinding;
}());
depp.require(['DOM', 'listjs', 'eventBus'], function () {
    console.log('ready');
    new UIBinding();
});
function pushState() {
}
function testE1() {
    depp.require('eventBus', function () {
        console.log('tst:');
        DeventBus.dispatch('dataB4', 'oh hi b4');
        DeventBus.dispatch('dataB4', 'oh hi b4');
        DeventBus.addListener('dataB4', function (data) {
            console.log('b4', data);
        });
        DeventBus.addListener('dataAf', function (data) {
            console.log('af:', data);
        });
        DeventBus.dispatch('dataAf', 'oh hi af');
        DeventBus.dispatch('dataAf', 'oh hi af');
    });
}
