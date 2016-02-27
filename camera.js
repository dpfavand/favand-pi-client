var PythonShell = require('python-shell');

var camera = {};

camera.pyCamera = null;

/**
 * Take pictures and send them to the server yay!
 */
camera.snapLoop = function(connection){
    if(connection.connected){
     
        PythonShell.run('camera.py', function(err, results){
            if (err) throw err;
            
            connection.emit('image', {image: true, buffer: 'data:image/png;base64,' + results[0] });
            console.log("snap")
            
            
        });   
    }
    setTimeout(camera.snapLoop, 1 * 1000);
};

module.exports = camera;