const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const Comment = new Schema({
// 	name: { type: String, default: 'hahaha' },
// 	age: { type: Number, min: 18, index: true },
// 	bio: { type: String, match: /[a-z]/ },
// 	date: { type: Date, default: Date.now },
// 	buff: Buffer
//   });


const UserSchema=new  Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String,
	},
	identity:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now
	}
})

const User=mongoose.model('users',UserSchema)
module.exports =User