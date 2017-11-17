/**
 * Socket Config
 */

//console.log("process.env.PATH: " + process.env.PATH);
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

module.exports = {
	"local": {
		host: "http://192.168.10.17",
		clients: "http://localhost:* http://127.0.0.1:*",
		port: 8686
	},
	"production": {
		host: "https://socket-menu.herokuapp.com",
		clients: "http://localhost:* http://127.0.0.1:* https://pcm-menu.herokuapp.com:*",
		port: 8080
	}
};
