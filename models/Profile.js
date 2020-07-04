const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 创建数据表

const ProfileSchema=new  Schema({
	type:{
		type:String,
		
	},
	describe:{
		type:String,
		
	},
	income:{
		type:String,
		required:true
	},
	expend:{
		type:String,
		required:true
	},
	cash:{
		type:String,
		required:true
	},
	remark:{
		type:String,
		
	},
	date:{
		type:Date,
		default:Date.now
	}
})

// profile 数据库里面的表名 如果没有就给你自己创建一个
const Profile=mongoose.model('profile',ProfileSchema)

module.exports =Profile