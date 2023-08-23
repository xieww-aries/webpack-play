module.exports = function(source, sourceMaps) {
	// 开始缓存
    this.cacheable && this.cacheable();
	this.callback(null, source.replace('webpack', ', I am Xieweiwei'), sourceMaps);
    return;
}
