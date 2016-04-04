var fs = require('fs');

var weather = {};

/**
 * Take pictures and send them to the server yay!
 */
weather.sampleLoop = function(connection){
    if(connection.connected){
        
        fs.readFile('/proc/am2301', function(err, contents) {
            console.log("WEATHER", contents);
            weatherData = contents.split(', ');
            connection.emit('weather', {temp: weatherData[0], humidity: weatherData[1]});
        })
        
        
           
    }
    setTimeout(function() {
        weather.sampleLoop(connection);
    }, 1 * 5000);
};

module.exports = weather;