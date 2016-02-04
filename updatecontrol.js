var updateControl = {};

updateControl.reboot = function () {
    require('child_process').exec('reboot', console.log);
}

updateControl.init = function (server) {
    server.on('pi_update', function (data) {
        console.log('told to reboot!');
        updateControl.reboot();
    })
}

module.exports = updateControl;