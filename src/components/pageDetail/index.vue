<template>
	<div v-html="content" v-loading="loading" v-highlight></div>
</template>


<script>
	import { Message  } from 'element-ui';
    export default {
        name: "PageDetail",
		data(){
        	return {
        		content:'',
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
					success: function (resp) {
						that.loading = false;
						if(resp.valid){
							that.content = resp.model&&resp.model.content||'';
						}
					},
					error:function () {
						that.loading = false;
						Message ({
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
        	this.init()
		}
    }
</script>

<style scoped>

</style>
