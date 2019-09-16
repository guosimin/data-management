<template>
	<el-menu :default-openeds="['1', '3']">
		<el-menu-item index="1" @click="handleOpen('/page-list')">
			<i class="el-icon-menu"></i>
			<span slot="title">用户管理</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
    export default {
        name: "common-menu",
		methods: {
			handleOpen(location) {
				this.$router.push(location)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
    }
</script>

<style scoped>

</style>
