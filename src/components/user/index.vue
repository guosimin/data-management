<template>
	<div>
		<h3>用户信息</h3>
		<div class="well">
			<el-form label-width="80px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="用户名：">
							<el-input size="small" v-model="query.userName" placeholder="请输入用户名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态：">
							<el-select v-model="query.status" placeholder="请选择状态" size="small">
								<el-option
									v-for="item in statusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="text-right">
						<el-button size="small" v-on:click="search">查询</el-button>
						<!--<el-button type="danger" size="small">新增</el-button>-->
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div>
			<el-table
				:data="models"
				border
				style="width: 100%;">
				<el-table-column
					prop="user_name"
					label="用户">
					<template slot-scope="scope">
						<img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px;display: inline-block;vertical-align: middle">
						<span style="display: inline-block;margin-left: 20px; vertical-align: middle">{{scope.row.user_name}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="user_url"
					label="获取方式"
					width="100px">
					<template slot-scope="scope">
						{{scope.row.type==1?'爬虫':'手动'}}
					</template>
				</el-table-column>
				<el-table-column
					prop="user_url"
					label="地址">
				</el-table-column>
				<el-table-column
					prop="status"
					label="状态"
					width="100">
					<template slot-scope="scope">
						<i v-if="scope.row.status!=1" class="el-icon-warning text-danger"></i>
						{{scope.row.status==1?'监控中':'已停止'}}
					</template>
				</el-table-column>
				<el-table-column
					label="操作"
					width="280">
					<template slot-scope="scope">
						<el-button size="small" v-on:click="changeStatus(scope.row.user_name,1)">启用</el-button>
						<el-button size="small" v-on:click="changeStatus(scope.row.user_name,0)">禁用</el-button>
					</template>
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
	</div>
</template>

<script>
	import common from '@/assets/js/common';
    export default {
        name: "user",
		data(){
        	return {
        		//查询参数
        		query:{
        			userName:'',
					status:''
				},
				//真实的查询参数
				queryModel:{},
				//数据源
				models:[],
				//分页
				paging:{},
				//状态的list
				statusOptions:[
					{label:'全部',value:''},
					{label:'监控中',value:'1'},
					{label:'已暂停',value:'0'},
				]
			}
		},
		methods:{
        	search(){
        		let that = this;
				that.queryModel = common.copy(that.query);
				console.log(that.queryModel,"that.queryModel");
				that._loadData(1);
			},
        	changeStatus(userName,status){
				let that = this;
				let postData = {
					userName:userName,
					status:status
				};
				$.ajax({
					url:'http://localhost:7777/user/update',
					type:'POST',
					contentType: 'application/json',
					data: JSON.stringify(postData),
					dataType: 'json',
					success: function (resp) {
						if(resp.valid){
							that._loadData(that.paging.pageIndex);
						}
						that.$message ({
							type: resp.valid?'success':'error',
							message:resp.message
						})
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
			/**
			 * 修改分页
			 * @param pageIndex 第几页
			 */
			currentChange(pageIndex) {
				this._loadData(pageIndex);
			},
			/**
			 * 加载列表数据
			 * @param pageIndex 第几页
			 * @private
			 */
			_loadData(pageIndex){
        		let that = this;
        		let postData = Object.assign({
					pagingQuery:{
						pageIndex:pageIndex||1,
						pageSize:10
					}
				},that.queryModel)
        		$.ajax({
					url:'http://localhost:7777/user/query',
					type:'POST',
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
				})
			},
			/**
			 * 初始化
			 */
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
