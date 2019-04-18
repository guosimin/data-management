<template>
	<div v-loading="loading">
		<h3>个人中心</h3>
		<div style="margin-top: 40px;">
			<el-row>
				<el-col :span='6'>
					<el-form ref="form" :model="form" label-width="100px">
						<el-form-item label="头像：">
							<el-col :span="6">
								<img :src="model.avatar" alt="" style="width: 60px;height: 60px;border: 1px solid #dcdfe6">
							</el-col>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<div>
						<el-form ref="form" :model="form" label-width="100px">
							<el-form-item label="用户名：">
								{{model.user_name||'-'}}
							</el-form-item>
						</el-form>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<div>
						<el-form ref="form" :model="form" label-width="100px">
							<el-form-item label="博文地址：">
								<a href="https://blog.csdn.net/github_39570717">{{model.user_url||'-'}}</a>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
    export default {
        name: "userSet",
		data(){
        	return {
				model:{},
				loading:true,
			}
		},
		methods:{
        	_loadData(){
        		let that = this;
				that.loading = true;
				let postData = {
					userName:that.$store.state.userName
				}
        		$.ajax({
					url: 'http://localhost:7777/common/user-setting',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(postData),
					dataType: 'json',
					success: function (resp) {
						that.loading = false;
						that.model = resp.model;
					},
					error:function () {
						that.loading = false;
						that.$message ({
							type: 'error',
							message:"网络错误，请稍后重试"
						})
					}
				})
			},
        	init(){
				this._loadData();
			}
		},
		mounted() {
        	this.init();
		}
	}
</script>

<style scoped>

</style>
