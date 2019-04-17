<template>
    <div id="app">
        <el-container v-if="isLogin" style="border: 1px solid #eee;height: 100vh">
            <el-aside width="200px" class="aside">
				<common-menu></common-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
					<el-dropdown @command="handleCommand" trigger="click">
					    <span class="el-dropdown-link link">
							<i class="el-icon-setting" style="margin-right: 15px"></i>{{userName}}
					    </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="set">个人中心</el-dropdown-item>
							<el-dropdown-item command="exit" divided>退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
                </el-header>

                <el-main direction="vertical">
					<router-view/>
                </el-main>
            </el-container>
        </el-container>
		<div v-if="!isLogin">
			<common-login></common-login>
		</div>
    </div>
</template>

<style>

</style>

<script>
import {mapState,mapMutations,mapAction } from 'vuex'
export default {
	data(){
		return {}
	},
	computed:{
		...mapState({
			isLogin: state => state.isLogin,
			userName:state => state.userName,
		}),
	},
	methods:{
		/**
		 * 用户设置
		 */
		handleCommand(command){
			switch (command) {
				case 'set':
					this.$router.push('/user-set')
					break;
				case 'exit':
					this.$store.commit('exit')
					break;
			}
			console.log(command,"command");
		}
	}
}
</script>
