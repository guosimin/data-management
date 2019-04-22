<template>
	<div>
		<h3>用户信息</h3>
		<div class="well">
			<el-form label-width="100px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="用户名：">
							<el-input size="small" v-model="query.userName" placeholder="请输入用户名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态：">
							<el-select v-model="query.status" placeholder="请选择状态" size="small" style="width: 100%">
								<el-option
									v-for="item in statusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="获取方式：">
							<el-select v-model="query.type" placeholder="请选择获取方式" size="small" style="width: 100%">
								<el-option
									v-for="item in typeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="text-right">
						<el-button size="small" @click="search">查询</el-button>
						<el-button type="danger" size="small" @click="opnAddDialog">新增</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div  v-loading="loading">
			<el-table
				:data="models"
				border
				style="width: 100%;">
				<el-table-column
					prop="user_name"
					label="用户">
					<template slot-scope="scope">
						<img :src="scope.row.avatar||defaultImg" style="width: 50px;height: 50px;display: inline-block;vertical-align: middle">
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


		<!--弹窗-->
		<el-dialog
			title="新增监控用户"
			:visible.sync="dialogVisible"
			width="400px">
				<span>
					<el-form :model="dialogQuery" label-width="80px" ref="dynamicValidateForm">
						<el-row>
							<el-col :span="24">
								<el-form-item label="用户名：" prop="userName"
									  :rules="[{ required: true, message: '用户名称不能为空', trigger: 'blur' }]">
									<el-input size="small" v-model="dialogQuery.userName" placeholder="请输入用户名称"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</span>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import common from '@/assets/js/common';
    export default {
        name: "user",
		data(){
        	return {
				defaultImg: require('../../assets/img/default-img.jpg'),
				dialogVisible:false,
				dialogQuery:{
					userName:'',
					userUrl:''
				},
        		//查询参数
        		query:{
        			userName:'',
					status:'',
					type:''
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
				],
				typeOptions:[
					{label:'全部',value:''},
					{label:'爬虫',value:'1'},
					{label:'手动',value:'2'},
				],
				loading:true
			}
		},
		methods:{
        	/**
			 *增加
			 */
        	add(){
        		let that = this;
				that.$refs['dynamicValidateForm'].validate((valid)=>{
					//验证通过
					if (valid) {
						that._postAdd(function () {
							that._loadData(that.paging.pageIndex);
							that.dialogVisible = false
						});
					}
				})
			},
			/**
			 * 发送增加请求
			 */
			_postAdd(callback){
        		let that = this;
        		let postData = {
        			userName:that.dialogQuery.userName
				}
				$.ajax({
					url:'http://localhost:7777/user/add',
					type:'POST',
					contentType: 'application/json',
					data: JSON.stringify(postData),
					dataType: 'json',
					success(resp){
						that.loading = false;
						that.$message ({
							type: resp.valid?'success':'error',
							message:resp.message
						});
						callback();
					},
					error(){
						that.loading = false;
						that.$message ({
							type: 'error',
							message:"网络错误，请稍后重试"
						})
					}
				});
			},
			/**
			 *打开增加弹窗
			 */
        	opnAddDialog(){
        		let that = this;
        		that.dialogQuery={
					userName:'',
						userUrl:''
				}
				that.dialogVisible = true
				if(that.$refs['dynamicValidateForm']&&that.$refs['dynamicValidateForm'].clearValidate){
					that.$refs['dynamicValidateForm'].clearValidate()
				}
			},
			/**
			 * 查询
			 */
        	search(){
        		let that = this;
				that.queryModel = common.copy(that.query);
				console.log(that.queryModel,"that.queryModel");
				that._loadData(1);
			},
			/**
			 * 修改状态
			 * @param userName <String> 修改的用户名
			 * @param status <Number> 1启用 0禁用
			 */
        	changeStatus(userName,status){
				let that = this;
				that.loading = true;
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
					success(resp) {
						that.loading = false;
						if(resp.valid){
							//刷新列表
							that._loadData(that.paging.pageIndex);
						}
						that.$message ({
							type: resp.valid?'success':'error',
							message:resp.message
						})
					},
					error() {
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
				that.loading = true;
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
					success(resp) {
						that.loading = false;
						that.models = resp.models||[];
						that.paging = resp.paging||{};
					},
					error() {
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
