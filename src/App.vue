<template>
    <div id="app">
        <el-container style="border: 1px solid #eee;height: 100vh">
            <el-aside width="200px" class="aside">
				<common-menu></common-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                </el-header>

                <el-main direction="vertical">
					<router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>

</style>

<script>
export default {
	data() {
		const item = {
			date: '2016-05-02',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1518 弄'
		};
		return {
			tableData: Array(20).fill(item)
		}
	}
}
</script>
