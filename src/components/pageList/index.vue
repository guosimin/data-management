<template>
	<div v-loading="loading">
		<h3>文章列表</h3>
		<el-table
			:data="models"
			border
			style="width: 100%;margin-top: 20px;">
			<el-table-column
				prop="title"
				label="文章名称">
				<template slot-scope="scope">
					<el-button type="text" @click="handleOpen('/page-detail',{id:scope.row._id})">{{scope.row.title}}</el-button>
				</template>
			</el-table-column>
			<el-table-column
				prop="read_num"
				label="阅读数"
				width="180">
			</el-table-column>
			<el-table-column
				prop="comment_num"
				label="评论数"
				width="180">
			</el-table-column>
			<el-table-column
				prop="create_time"
				label="创建日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="link"
				label="链接"
				width="480">
			</el-table-column>
		</el-table>
		<div v-if="paging&&paging.count">
			<el-pagination style="margin-top:30px;"
						   background @current-change="currentChange"
						   layout="prev, pager, next"
						   :total="paging.count">
			</el-pagination>
		</div>
	</div>
</template>

<script>
    export default {
        name: "pageList",
		data() {
			return {
				models:[],
				loading:true,
				paging:{}
			}
		},
		methods:{
			handleOpen(location,query){
				this.$router.push({path:location,query:query})
			},
			currentChange(pageIndex) {
				this._loadData(pageIndex);
			},
			_loadData(pageIndex){
				let that = this;
				that.loading = true;
				let postData = {
					userName:that.$store.state.userName,
					pagingQuery:{
						pageIndex:pageIndex||1,
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
						that.models = resp.models||[];
						that.paging = resp.paging||{};
						that.loading = false;
					},
					error:function () {
						that.loading = false;
						that.$message ({
							type: 'error',
							message:"网络错误，请稍后重试"
						})
					}
				});
			},
			init(){
				this._loadData();
			}
		},
		mounted(){
			this.init();
		}
    }
</script>

<style scoped>

</style>
