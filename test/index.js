// var cache = require('pqcachedb');

var cache = require('../index');

cache.setCache('test', Math.random(), function(){});

cache.setCache('test2', Math.random(), function(){});

cache.setCache('test3', Math.random(), function(){});

cache.setCache('url','https://github.com', function(){

	cache.getCache('url', function(err,data){
		console.log(data);
	});
	
	cache.getCache('test3', function(err,data){
		console.log(data);
	});

});



// cache.pgCacheDb();

	cache.getCache('test2', function(err,data){
		console.log(data);
	});

	cache.getCache('test3', function(err,data){
		console.log(data);
	});


/*

cache.setCache('test', Math.random(), function(){});

cache.setCache('test2', Math.random(), function(){});

cache.setCache('test3', Math.random(), function(){});

cache.setCache('url','https://github.com', function(){

	cache.getCache('url', function(err,data){
		console.log(data);
	});
	
	cache.getCache('test3', function(err,data){
		console.log(data);
	});

});

*/

/*




cache.getCache('url', function(err,data){
	console.log(data);
});


cache.getKeys(function(err, keys){
	console.log(keys);
});


cache.getActiveKeys(function(err, keys){
	console.log(keys);
});

cache.cleanCache(function(){
	cache.getKeys(function(err, keys){
		console.log(keys);
	});
});

cache.purgeCache(function(){
	cache.getKeys(function(err, keys){
		console.log(keys);
	});
});

cache.setCache('test4', 'Houdini', function(){

	cache.getCache('test4',function(err, data){
		console.log('test4: '+data);
		
		cache.purgeKey('test4', function(err){
			if(err){
				console.log(err);
			}

			cache.getCache('test4',function(err, data){
				console.log('test4: '+data);
			});
			
		});	
		
	});
	
});
*/