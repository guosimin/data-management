<template>
	<div v-loading="models.length>0?false:true">
		<el-row>
			<el-col :span="12">
				<h3>访问数据</h3>
			</el-col>
			<el-col :span="12" class="text-right">
				<el-radio-group v-model="radio3" size="mini">
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
	var Chart1,Chart2,Chart3,Chart4;
	export default {
		name: "charts",
		data() {
			return {
				radio3: '全部',
				models: [],
				selectItem:{},
				labels:[]
			}
		},
		methods:{
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

				var myChart3 = document.getElementById("myChart3").getContext("2d");
				Chart3&&Chart3.destroy();
				Chart3 = this._renderChart(myChart3, {
					"data": {
						"labels": label,
						"datasets": [{
							"label": '总阅读数',
							"data": readNum,
						}]

					}
				})

				var myChart4 = document.getElementById("myChart4").getContext("2d");
				Chart4&&Chart4.destroy();
				Chart4 = this._renderChart(myChart4, {
					"data": {
						"labels": label,
						"datasets": [{
							"label": '总评论数',
							"data": commentNum,
						}]

					}
				})

			},
			_renderChart:function (dom, option) {
				var defalutOption = {
					"type": "line",
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
						var label = [], readNum = [], commentNum = [];
						for (var key in params.model.countData) {
							var item = (params.model.countData)[key];
							label.push(key);
							readNum.push(item.readNum)
							commentNum.push(item.commentNum)
						}
						that.labels = label;
						that.$options.methods.select(that.selectItem,that.models,label);


						//显示总阅读数
						var myChart1 = document.getElementById("myChart1").getContext("2d");
						_renderChart(myChart1, {
							"data": {
								"labels": label,
								"datasets": [{
									"label": '总阅读数',
									"data": readNum,
								}]

							}
						})

						//显示总评论数
						var myChart2 = document.getElementById("myChart2").getContext("2d");
						_renderChart(myChart2, {
							"data": {
								"labels": label,
								"datasets": [{
									"label": '总评论数',
									"data": commentNum,
								}]

							}
						})
					}
				});
			}

			/**
			 * 初始化
			 */
			function _init() {
				_loadData();
			}

			//-- =======================================初始化===========================================
			_init()


			/*var myLineChart = new Chart(c, {
				"type": "line",
				"data": {
					"labels": ["January", "February", "March", "April", "May", "June", "July"],
					"datasets": [{
						"label": "访问量",
						"data": [65, 59, 80, 81, 56, 55, 40],
						"fill": false,
						"borderColor": "#409eff",
						"lineTension": 0.1
					},
						{
							"label": "访问数据",
							"data": [615, 539, 80, 81, 11, 255, 340],
							"fill": false,
							"borderColor": "#9d0101",
							"lineTension": 0.1
						}]
				},
				"options": {}
			});*/
		}

	}
</script>

<style scoped>

</style>
