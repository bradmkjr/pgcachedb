/*!
 * PGCacheDB 
 *
 * Copyright(c) 2017 Bradford Knowlton
 * MIT Licensed
 *
 * Version 1.1.5
 */

'use strict';

const { Client } = require('pg');

// console.log(process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(function(err, res){
	console.log('Connected');
	// Create the database table if it doesn't exist
	client.query('CREATE TABLE IF NOT EXISTS pgcachedb ( ID SERIAL PRIMARY KEY, key VARCHAR (128) UNIQUE NOT NULL, data TEXT NOT NULL, date_created TIMESTAMP, date_updated TIMESTAMP );', function(err, result) {
	  if (err) throw err; 	  
	});
});

// default age for active cache entries
const cacheLifetime = '6 hours';

/**
* pgCacheDb
* placeholder function
*
*/
exports.pgCacheDb = function(){
		
};

/**
* getCache
* Gets the cache data based on a key.
*
* @param   {string} key Value for lookup in database.
* @param   {Function} callback function name for callback
*/
exports.getCache = function(key, callback){
	
	// query database for data based on key with date within lifetime
	const text = "SELECT key, data FROM pgcachedb WHERE key = $1 AND date_updated > now() - interval '"+cacheLifetime+"' ;";
	const values = [key];
	
	// callback
	client.query(text, values, (err, res) => {
	  if (err) {
	    callback(err, undefined );  
	  } else if( res.rows == undefined || res.rows.length == 0 ){
		callback(err, undefined );  
	  } else {
	  	callback(err, res.rows[0].data);
	  }
	})
	
};

/**
* setCache
* Sets the cache data based on a key.
*
* @param   {string} key Value for lookup in database.
* @param   {string} data Value to be stored in cache.
* @param   {Function} callback function name for callback
*/
exports.setCache = function(key, data, callback){

	const text = "WITH upsert AS (UPDATE pgcachedb SET data = $2, date_updated = now() WHERE key = $1 RETURNING *) INSERT INTO pgcachedb ( key, data, date_created, date_updated) SELECT $1, $2, now(), now() WHERE NOT EXISTS (SELECT * FROM upsert);";
	const values = [ key, data];

	// callback
	client.query(text, values, (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	  	console.log(values);
	    callback(err, values);
	  }
	}); // end client.query
};

/**
* purgeCache
* removes all keys from cache
*
* @param   {Function} callback function name for callback
*/
exports.purgeCache = function(callback){	
	// not ported yet
	/*
	cacheDb.serialize(function() { 		
		cacheDb.run('DELETE FROM `cache`', function(){
			callback();	
		});
	});
*/
};

/**
* purgeKey
* removes a key from cache
*
* @param   {string} key Value for lookup in database.
* @param   {Function} callback function name for callback
*/
exports.purgeKey = function(key,callback){
	// not ported yet
	/*
	cacheDb.serialize(function() { 		
		cacheDb.run('DELETE FROM `cache` WHERE `key` == ?', key, function(){
			callback();	
		});
	});
*/
};

/**
* cleanCache
* removes all keys from cache which are expired
*
* @param   {Function} callback function name for callback
*/
exports.cleanCache = function(callback){
	// not ported yet	
	/*
	cacheDb.serialize(function() { 		
		cacheDb.run('DELETE FROM `cache` WHERE date_updated < datetime("now", ?)', cacheLifetime, function(){
			callback();	
		});
	});
*/
};


/**
* getKeys
* Gets all the keys in the cache.
*
* @param   {Function} callback function name for callback
*/
exports.getKeys = function(callback){
	// not ported yet	
/*
	var keys = [];
	
	cacheDb.serialize(function() {	
		cacheDb.all('SELECT key FROM `cache`', function(err, rows) {
			if ( err ){			
				callback(err, null);
			}else{
				rows.forEach(function(row){
					keys.push(row.key);
				});
			}
			callback(err,keys);
		});
	});
*/
};

/**
* getActiveKeys
* Gets all the keys in the cache recently set.
*
* @param   {Function} callback function name for callback
*/
exports.getActiveKeys = function(callback){
	// not ported yet
/*

	var keys = [];
	
	cacheDb.serialize(function() {	
		cacheDb.all('SELECT key FROM `cache` WHERE date_updated > datetime("now", ?)', cacheLifetime, function(err, rows) {
			if ( err ){			
				callback(err, null);
			}else{
				rows.forEach(function(row){
					keys.push(row.key);
				});
			}
			callback(err,keys);
		});
	});
*/
};