const express = require('express')
const router = express.Router()

const Profile = require('../../models/Profile')

const passport = require('passport')


////添加数据（增）
// @url  /api/profiles/add
// @des  添加数据返回添加数据的json格式数据 
// @public   priviate 


router.post('/add', passport.authenticate('jwt', {session: false}),(req, res) => {
    // res.send('add')
    console.log(req.body)
    const ProfileFields = {}
    //所有添加的数据不能为空
    if (req.body.type) ProfileFields.type = req.body.type
    if (req.body.describe) ProfileFields.describe = req.body.describe
    if (req.body.income) ProfileFields.income = req.body.income
    if (req.body.expend) ProfileFields.expend = req.body.expend
    if (req.body.cash) ProfileFields.cash = req.body.cash
    if (req.body.remark) ProfileFields.cash = req.body.remark

    console.log(ProfileFields)
    //添加到数据库里面去  然后再返回给前端 当前添加数据
    new Profile(ProfileFields).save().then(profile => {
        res.json(profile)
    })

 }

);


//查询所有数据接口（查）
// @route get  api/profiles
// @desc    获取所有的信息 
// @access  Prviate  
router.get('/', passport.authenticate('jwt', {
    session: false
}),
(req, res) => {
    Profile.find().then(profile => {
        if (!profile) {
            return res.status(404).json('没有任何内容')
        }

        res.json(profile)
    }).catch(err => {
        res.status(404).json(err)
    })

}

);


// 查询个人信息
// @route get  api/profiles/:id
// @desc    获取单个信息
// @access  Prviate  


router.get('/:id', passport.authenticate('jwt', {
    session: false
}),
(req, res) => {
    Profile.findOne({
        id: req.params.id
    }).then(profile => {
        if (!profile) {
            return res.status(404).json('没有任何数据')
        }
        res.json(profile)
    }).catch(err => {
        res.status(404).json(err)
    })

}

);

//编辑数据（改）
// @route get  api/profiles/edit     
// @desc    编辑信息接口  //编辑某一个的信息 所有需要传递id  
// @access  Prviate  

router.post('/edit/:id', passport.authenticate('jwt', {
    session: false
}),
(req, res) => {
    const ProfileFields = {}
    if (req.body.type) ProfileFields.type = req.body.type
    if (req.body.describe) ProfileFields.describe = req.body.describe
    if (req.body.income) ProfileFields.income = req.body.income
    if (req.body.expend) ProfileFields.expend = req.body.expend
    if (req.body.cash) ProfileFields.cash = req.body.cash
    if (req.body.remark) ProfileFields.cash = req.body.remark

    Profile.findOneAndUpdate({
            _id: req.params.id,
        }, {
            $set: ProfileFields
        }, {
            new: true
        }

    ).then(profile => res.json(profile))

}

);

// 删除信息接口
// @route get  api/profiles/delete/:id     
// @desc    删除信息接口  //删除某一个的信息 所有需要传递id  
// @access  Prviate 
router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}),
(req, res) => {
        // Profile.findOneAndRemove({_id:req.params.id}).then(profiles=>{
        //     profiles.save().then(profile=>res.json(profile))
        // }).catch(err=>res.status(404).json('删除失败'))
        Profile.remove({_id:req.params.id},function(err,docs){
            if(err){
                res.status(500).send();
            }
            res.json({statu:200,data:docs})
        })
}

);

module.exports = router