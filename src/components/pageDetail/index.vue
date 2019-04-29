<template>
	<div v-html="content" v-loading="loading" v-highlight></div>
</template>


<script>
	//指令
	import highlight from '@/components/common/directive/highlight'
    export default {
        name: "PageDetail",
		data(){
        	return {
        		//内容
        		content:'',
				//加载
				loading:true,
			}
		},
		methods:{
        	_loadData(){
				let that = this;
				that.loading = true;
				let postData = {
					id:that.$route.query.id
				}
				$.ajax({
					url: 'http://localhost:7777/page/detail',
					type: 'GET',
					contentType: 'application/json',
					data: postData,
					dataType: 'json',
					success(resp) {
						that.loading = false;
						if(resp.valid){
							that.content = resp.model&&resp.model.content||'';
						}
					},
					error() {
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
		//指令
		directives:{
			'highlight':highlight
		},
		mounted(){
        	this.init()
		}
    }
</script>
