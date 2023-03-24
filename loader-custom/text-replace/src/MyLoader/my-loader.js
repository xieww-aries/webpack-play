module.exports = function(source, sourceMaps) {
	console.log(111222, source);
	this.callback(null, source.replace('webpack', ', I am Xieweiwei'), sourceMaps);
    return;
}
