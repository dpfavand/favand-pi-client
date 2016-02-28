var PythonShell = require('python-shell');

var camera = {};

/**
 * Take pictures and send them to the server yay!
 */
camera.snapLoop = function(connection){
    if(connection.connected){
        console.log("snapping!");
        PythonShell.run('camera.py', function(err, results){
            if (err) throw err;
            
            // console.log(results[0]);
            
            connection.emit('image', {image: true, buffer: 'data:image/png;base64,' + results[0] });
            
            connection.emit('pi_error', "SENT IMAGE DAMNIT");
            
            console.log("snap")
            
            
        });   
    }
    setTimeout(function() {
        camera.snapLoop(connection);
    }, 1 * 5000);
};

module.exports = camera;