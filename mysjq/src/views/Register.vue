<template>
  <section class="register">
    <section class="form_container">
      <!-- 上面标题 -->
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="register"
        :rules="rules"
        ref="registerForm"
        label-width="80px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="register.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="register.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="register.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="text" v-model="register.password2" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="register.identity" placeholder="请选择">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </section>
</template>

<script>
export default {
  data() {
      var validatePass2 = (rule, value, callback) => {
     if (value !== this.register.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      register: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        email: {
          type: 'email',
          required: true,
          message: '邮箱格式不正确',
          trigger: 'blur'
        },
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  computed: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
			alert('submit!');
			this.$axios.post('/api/users/register',this.register).then(res=>{
				console.log(res)
				//注册成功
				this.$message({
					type:'success',
					message:'注册成功'
				})
				this.$router.push('/login')
			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.register {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>