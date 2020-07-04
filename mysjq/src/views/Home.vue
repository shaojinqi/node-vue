<template>
<section class="home">
  <div class="container">
            <h1 class="title">vue在线后台</h1>
            <p class="lead"> 用心做服务! </p>
        </div>
</section>
</template>

<script>
export default {
data() {
return {

}
},
components:{

},
computed:{

},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{

},
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>