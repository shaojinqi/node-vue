const express = require('express')
const router  = express.Router()

const User = require('../../models/User')

//生成全球认证图像
const gravatar = require('gravatar');

//密码加密
const bcrypt = require('bcrypt');

// 生成token 
const jwt = require('jsonwebtoken')

const passport=require('passport')
// router.get('/test',(req,res)=>{
//     res.json({name:'zssss',age:18})
// })


// router.post('/post',(req,res)=>{
//     res.json({name:'lllsss',age:18})
// })


// @desc    返回请求的json数据   
// @url:'/api/users/register'
// @access  public 
// post 请求  需要第三方 插件 解析post请求数据

router.post('/register',(req,res)=>{
    //用户名 密码  邮箱   
    const {
        email 
    }=req.body;
//从数据库里面查询有没有这个邮箱 如果有那么提示 邮箱已经存在 如果没有 那么可以注册
	//    并且把注册之后的结果返回给前端
    User.findOne({
        email
    }).then(user=>{
        if(user){
            res.json({
                msg:'该邮箱已经存在'
            })
        }else{
            const avatar = gravatar.url('123@qq.com',{
                s:'200',
                r:'pg',
                d:'mm'
            })
            //取值 
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
                identity:req.body.identity
            })
            const saltRounds = 10
            bcrypt.genSalt(saltRounds,function (err,salt) {
                bcrypt.hash(req.body.password,salt,function (err,hash) {
                    console.log(hash);
                    newUser.password = hash
                    newUser.save().then(user=>res.json(user)).catch(err=>console.log(err))                    
                })
                
            })
            newUser.save().then(user=>res.json(user)).catch(err=>console.log(err))                    
        }
    }).catch(err=>{
console.log(err);

    })

})

//登陆接口 

// @desc    返回token
// @access  privite 
// @url    /api/users/login
// post 请求  需要第三方 插件 解析post请求数据

// npm install jsonwebtoken


router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email
    }).then(user=>{
        if (!user) {
            return res.status(404).json('用户不存在')
        }
        console.log(1);
        // //进行密码验证 
            bcrypt.compare(password, user.password).then((isMatch) => {
                // isMatch == true
                if (isMatch) {
                    //定义一个准备生成token的规则
                    const rule = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        identity: user.identity
                    };
    
    
                    jwt.sign(rule, 'secret', {
                        // expiresIn: '1h'
                        expiresIn: 6000*6000*6000
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: 'Bearer ' + token // 这里只能写Bearer+空格  固定写法
                      
                        })
                    });
    
                }else {
                    // console.log(isMatch)
                    res.json({msg:'密码不对'})
                }
    
            })
    
    })
})

// 验证生成的token 
//1 安装 cnpm install passport  以及  npm  i  passport-jwt
// @route get  api/users/current 
// desc  return current user  
// access private 
router.get('/current', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);


module.exports = router