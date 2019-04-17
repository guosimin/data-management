<template>
	<div>
		<h3>个人中心</h3>
		<div style="margin-top: 40px;">
			<el-row>
				<el-col :span='6'>
					<el-form ref="form" :model="form" label-width="100px">
						<el-form-item label="头像：">
							<el-col :span="6">
								<img src="https://avatar.csdn.net/9/1/B/3_github_39570717.jpg" alt="" style="width: 60px;height: 60px;border: 1px solid #dcdfe6">
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
								github_39570717
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
								<a href="https://blog.csdn.net/github_39570717">https://blog.csdn.net/github_39570717</a>
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
        name: "userSet"
    }
</script>

<style scoped>

</style>
