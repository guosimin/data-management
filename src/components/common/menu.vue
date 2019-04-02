<template>
	<el-menu :default-openeds="['1', '3']">
		<el-menu-item index="1" @click="handleOpen('/charts')">
			<i class="el-icon-menu"></i>
			<span slot="title">csdn访问数据</span>
		</el-menu-item>
		<el-submenu index="2">
			<template slot="title"><i class="el-icon-menu"></i>导航二</template>
			<el-menu-item-group>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title"><i class="el-icon-setting"></i>导航三</template>
			<el-menu-item-group>
				<el-menu-item index="3-1">选项1</el-menu-item>
				<el-menu-item index="3-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="3-3">选项3</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title"><i class="el-icon-message"></i>导航一</template>
			<el-menu-item-group>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
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
