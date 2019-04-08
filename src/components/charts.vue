<template>
	<div v-loading="models.length>0?false:true">
		<el-row>
			<el-col :span="12">
				<h3>访问数据</h3>
			</el-col>
			<el-col :span="12" class="text-right">
				<el-radio-group v-model="fillerDate" size="mini">
					<!--<el-radio-button label="今天"></el-radio-button>
					<el-radio-button label="最近七天"></el-radio-button>
					<el-radio-button label="最近一个月"></el-radio-button>-->
					<el-radio-button label="全部"></el-radio-button>
				</el-radio-group>
			</el-col>
		</el-row>
		<div style="margin-top: 20px">
			<el-row>
				<el-col :span="12">
					<canvas id="myChart1"></canvas>
				</el-col>
				<el-col :span="12">
					<canvas id="myChart2"></canvas>
				</el-col>
			</el-row>
			<el-row style="margin-top: 30px">
				<el-col :span="12">
					<canvas id="myChart1_1"></canvas>
				</el-col>
				<el-col :span="12">
					<canvas id="myChart2_2"></canvas>
				</el-col>
			</el-row>
		</div>

		<div style="margin-top: 40px">
			<el-row>
				<el-col :span="24">
					<h3>
						<span class="vertical-m">
							文章访问数据
						</span>
						<el-dropdown>
							<el-badge :value="models.length" class="item">
								<el-button type="primary" size="mini">
									{{selectItem.title||"文章选择"}}<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
							</el-badge>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="select(item)" :key="index" v-for="(item,index) in models">
									<span class="text-danger">{{item.pageNum}}</span>&nbsp;&nbsp;&nbsp;{{item.title}}
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>

					</h3>
				</el-col>
			</el-row>


			<el-row>
				<el-col :span="12">
					<canvas id="myChart3"></canvas>
				</el-col>
				<el-col :span="12">
					<canvas id="myChart4"></canvas>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	var Chart1,Chart2,Chart3,Chart4,Chart1_1,Chart2_1;
	export default {
		name: "charts",
		data() {
			return {
				//过滤
				fillerDate: '全部',
				//数据源
				models: [],
				//选择的文章数据
				selectItem:{},
				//x轴内容
				labels:[]
			}
		},
		methods:{
			/**
			 * 勾选方法
			 */
			select:function (item,models=[],label=[]) {
				this.selectItem = item;
				let readNum = [],commentNum = [];
				models = this.models||models;
				label = this.labels||label;
				for (var i = 0;i<models.length;i++){
					if(models[i].title===item.title){
						var item = models[i].spiderData;
						for (var key in label) {
							var index = label[key];
							readNum.push(item[index]&&item[index].read_num||0)
							commentNum.push(item[index]&&item[index].comment_num||0)
						}
					}
				}

				this._createChart("myChart3",Chart3,label,[{
					"label": '总阅读数',
					"data": readNum,
				}]);
				this._createChart("myChart4",Chart4,label,[{
					"label": '总评论数',
					"data": commentNum,
				}]);
			},
			/**
			 * 创建chart调用
			 */
			_createChart:function(str,chartName,label,datasets,type){
				var label = this.labels||label;
				var chartDom = document.getElementById(str).getContext("2d");
				var chart = chartName;
				chart&&chart.destroy();
				chart = this._renderChart(chartDom, {
					"data": {
						"labels": label,
						"datasets":datasets

					}
				},type)
				console.log(datasets,"datasets");
			},
			/**
			 * 渲染chart调用
			 */
			_renderChart:function (dom, option,type) {
				var defalutOption = {
					"type": type||"line",
					"data": {
						"labels": [],
						"datasets": [{
							"label": "阅读数",
							"data": [],
							"fill": false,
							"borderColor": "#409eff",
							"backgroundColor": "#409eff",
							"lineTension": 0.1
						}]
					},
					"options": {}
				}
				defalutOption = $.extend(true, defalutOption, option);
				return new Chart(dom, defalutOption);
			}
		},
		mounted: function () {
			var that = this;
			//-- =======================================变量===========================================
			var params = {}

			//-- =======================================函数===========================================
			/**
			 * 渲染图表
			 */
			function _renderChart(dom, option) {
				that.$options.methods._renderChart(dom, option);
			}

			/**
			 * 加载数据
			 */
			function _loadData() {
				$.ajax({
					url: 'http://localhost:7777/charts/query',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({}),
					dataType: 'json',
					success: function (resp) {
						that.models = resp.models;
						that.selectItem = resp.models[0];
						params.model = resp.model || {};
						var label = [], readNum = [], commentNum = [],growReadNum=[],growCommentNum=[];
						for (var key in params.model.countData) {
							var item = (params.model.countData)[key];
							label.push(key);
							readNum.push(item.readNum)
							commentNum.push(item.commentNum)
						}

						for (var key in params.model.growData) {
							var item = (params.model.growData)[key];
							growReadNum.push(item.readNum)
							growCommentNum.push(item.commentNum)
						}
						that.labels = label;
						_initRender({readNum:readNum,commentNum:commentNum,growReadNum:growReadNum,growCommentNum:growCommentNum});
					}
				});
			}

			/**
			 * 初始化渲染
			 */
			function _initRender(obj) {
				that.$options.methods.select(that.selectItem,that.models,that.labels);
				that.$options.methods._createChart("myChart1",Chart1,that.labels,[{
					"label": '总阅读数',
					"data": obj.readNum,
				}]);
				that.$options.methods._createChart("myChart2",Chart2,that.labels,[{
					"label": '总评论数',
					"data": obj.commentNum,
				}]);
				that.$options.methods._createChart("myChart1_1",Chart1_1,that.labels,[{
					"label": '总阅读数-增长数',
					"data": obj.growReadNum,
				}],'horizontalBar');
				that.$options.methods._createChart("myChart2_2",Chart2_1,that.labels,[{
					"label": '总评论数-增长数',
					"data": obj.growCommentNum,
				}],'horizontalBar');
			}

			/**
			 * 初始化
			 */
			function _init() {
				_loadData();
			}

			//-- =======================================初始化===========================================
			_init();
		}

	}
</script>
