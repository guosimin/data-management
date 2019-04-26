<template>
	<div v-loading="loading">
		<el-row>
			<el-col :span="12">
				<h3>访问数据</h3>
			</el-col>
			<el-col :span="12" class="text-right">
				<el-radio-group v-model="fillerDate" size="mini" @change = "change">
					<!--<el-radio-button label="今天"></el-radio-button>-->
					<el-radio-button label="1">最近七天</el-radio-button>
					<el-radio-button label="2">最近三十天</el-radio-button>
					<el-radio-button label="3">全部</el-radio-button>
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
	</div>
</template>

<script>
	let chart = [];
	export default {
		name: "charts",
		data() {
			return {
				//正在加载数据
				loading:true,
				//过滤
				fillerDate: '3',
				//数据源
				models: [],
				//x轴内容
				labels:[]
			}
		},
		methods:{
			change(){
				this._loadData()
			},
			/**
			 * 创建chart调用
			 * @params <String> dom 名称
			 * @params <Array> x轴每一项的名称
			 * @params <Array> 数据源
			 * @params chart图像类型
			 */
			_createChart (str,label,datasets,type){
				if(!document.getElementById(str)){
					return false;
				}
				label = this.labels||label;
				let chartDom = document.getElementById(str).getContext("2d");
				let chart =  this._renderChart(chartDom, {
					"data": {
						"labels": label,
						"datasets":datasets

					}
				},type)
				return chart;
			},
			/**
			 * 渲染chart调用
			 */
			_renderChart (dom, option,type) {
				let defalutOption = {
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
			},
			/**
			 * 获取多少天的时间戳
			 * @param beforeDays 多少天
			 * return 时间戳
			 */
			_getData(beforeDays){
				let myDate;
				if(beforeDays&&beforeDays>0){
					let nowDate = new Date();
					myDate = new Date(nowDate - 1000 * 60 * 60 * 24 * beforeDays);
				}else{
					myDate =new Date();
				}
				let nowY = myDate.getFullYear();
				let nowM = myDate.getMonth()+1;
				let nowD = myDate.getDate();
				let enddate = nowY+(nowM<10 ? "0" + nowM : nowM)+(nowD<10 ? "0"+ nowD : nowD);
				return enddate;
			},
			/**
			 * 加载数据
			 */
			_loadData(){
				let that = this
				let params = {}
				that.loading = true;
				let postData = {'userName':that.$store.state.userName};
				if(that.fillerDate!=3){
					postData.start = that.fillerDate==1?that._getData(7):that._getData(30);
					postData.end = that._getData();
				}
				$.ajax({
					url: 'http://localhost:7777/charts/query',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(postData),
					dataType: 'json',
					success(resp) {
						that.loading = false;
						params.model = resp.model || {};
						let label = [], readNum = [], commentNum = [],growReadNum=[],growCommentNum=[];
						for (let key in params.model.countData) {
							let item = (params.model.countData)[key];
							label.push(key);
							readNum.push(item.readNum)
							commentNum.push(item.commentNum)
						}

						for (let key in params.model.growData) {
							let item = (params.model.growData)[key];
							growReadNum.push(item.readNum)
							growCommentNum.push(item.commentNum)
						}
						that.labels = label;
						that._initRender({readNum:readNum,commentNum:commentNum,growReadNum:growReadNum,growCommentNum:growCommentNum});
					}
				});
			},
			/**
			 * 清空canvas图像
			 * @private
			 */
			_destroy(){
				for(var i = 1;i<chart.length;i++){
					if(chart[i]&&chart[i].destroy){
						chart[i].destroy()
					}
				}
			},
			/**
			 * 初始化渲染
			 * @param obj 数据源
			 * @private
			 */
			_initRender(obj){
				let that = this;
				//清空canvas图像
				that._destroy();
				chart[0] = that._createChart("myChart1",that.labels,[{
					"label": '总阅读数',
					"data": obj.readNum,
				}]);
				chart[1] = that._createChart("myChart2",that.labels,[{
					"label": '总评论数',
					"data": obj.commentNum,
				}]);
				chart[2] = that._createChart("myChart1_1",that.labels,[{
					"label": '总阅读数-增长数',
					"data": obj.growReadNum,
				}],'horizontalBar');
				chart[3] = that._createChart("myChart2_2",that.labels,[{
					"label": '总评论数-增长数',
					"data": obj.growCommentNum,
				}],'horizontalBar');
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
