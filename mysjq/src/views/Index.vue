<template>
<section class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>

 <div class="rightContainer">
      <router-view></router-view>
    </div>

</section>
</template>

<script>

import HeadNav from '../components/HeadNav'

import LeftMenu from '../components/LeftMenu'
export default {
data() {
return {

}
},
components:{
	HeadNav,
		LeftMenu,

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
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  /* height: calc(100% - 71px); */
  height: 657px;
  overflow: auto;
}

</style>