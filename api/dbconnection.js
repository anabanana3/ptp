var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'localhost',
 user:'root',
 password:'beecodea5a',
 database:'Aisha'
 
});
 module.exports=connection;
