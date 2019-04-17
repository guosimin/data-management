<template>
	<div style="height: 100vh; background: #282c34; width: 100%; position: relative;">
		<el-form ref="form" label-width="80px" style="position: absolute;top: 50%; margin-top: -144px; margin-left: -231px; left: 50%; width: 400px; border: 1px solid #DCDFE6; padding: 30px; background: #fff; ">
			<h1 class="text-center" style="padding: 30px 0;">csdn监控系统</h1>
			<el-form-item label="用户名">
				<el-input v-model="userName"></el-input>
				<div>测试例子: <b>github_39570717</b></div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
        name: "login",
		data(){
        	return {
				userName:''
			}
		},
		methods:{
			/**
			 * 登录
			 */
			login(){
				let that = this;
				this.$store.dispatch('goLogin', that.userName)
			},
			/**
			 * 初始化方法
			 */
			init(){

			}
		},
    }
</script>

<style scoped>

</style>
