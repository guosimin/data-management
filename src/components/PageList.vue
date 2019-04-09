<template>
	<div v-loading="loading">
		<h3>文章列表</h3>
		<el-table
			:data="models"
			border
			style="width: 100%;margin-top: 20px;">
			<el-table-column
				prop="create_time"
				label="创建日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="title"
				label="文章名称">
			</el-table-column>
			<el-table-column
				prop="link"
				label="链接"
				width="480">
			</el-table-column>
		</el-table>
		<el-pagination style="margin-top:30px;"
			background
			layout="prev, pager, next"
			:total="1000">
		</el-pagination>
	</div>
</template>

<script>
    export default {
        name: "pageList",
		data() {
			return {
				models:[],
				loading:true
			}
		},
		mounted(){
			let that = this;
			//-- =======================================变量===========================================
			let params = {}

			//-- =======================================函数===========================================
			/**
			 * 加载数据
			 * @private
			 */
			function _loadData() {
				that.loading = true;
				let postData = {
					pagingQuery:{
						pageIndex:1,
						pageSize:10
					}
				}
				$.ajax({
					url: 'http://localhost:7777/page/query',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(postData),
					dataType: 'json',
					success: function (resp) {
						that.models = resp.models;
						that.loading = false;
					}
				});
			}

			/**
			 * 初始化
			 * @private
			 */
			function _init() {
				_loadData();
			}
			//-- =======================================初始化===========================================
			_init();
		}
    }
</script>

<style scoped>

</style>
