var fs = require('fs');

var weather = {};

/**
 * Take pictures and send them to the server yay!
 */
weather.sampleLoop = function(connection){
    if(connection.connected){
        
        fs.readFile('/proc/am2301', 'utf8', function(err, contents) {
            console.log("WEATHER", contents);
            weatherData = contents.split(', ');
            connection.emit('weather', {temp: weatherData[1], humidity: weatherData[0]});
        })
        
        
           
    }
    setTimeout(function() {
        weather.sampleLoop(connection);
    }, 1 * 5000);
};

module.exports = weather;