<template>
	<div v-html="content" v-highlight></div>
</template>


<script>
    export default {
        name: "PageDetail",
		data(){
        	return {
        		content:''
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
						that.content = resp.model.content;
						console.log("a");
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
