<template>
  <div>
    <el-table
      :data="list"
      height="600"
      border
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="bookNum" label="预约编号"></el-table-column>
      <el-table-column prop="roomNum" label="教室编号"></el-table-column>
      <el-table-column prop="bookerName" label="预约者姓名"></el-table-column>
      <el-table-column prop="bookTime" label="预定发起时间"></el-table-column>
      <el-table-column prop="startTime" label="起始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleAgree(scope.row.bookNum)">同意</el-button>
          <el-button size="mini" type="danger" @click="handleReject(scope.row.bookNum)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <div style="margin-top: 20px">
      <el-button size="small" @click="toggleSelection()">取消选择</el-button>
      <el-button size="small" type="success" @click="handleAgree(null)">全部同意</el-button>
      <el-button size="small" type="danger" @click="toggleSelection()">全部拒绝</el-button>
    </div>
  </div>
</template>

<script>
import ProcessApi from "@/api/process";

export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      multipleSelection: []
    };
  },
  created() {
    this.fetchData();
  },
  components: {},

  methods: {
    fetchData() {
      ProcessApi.search(this.currentPage, this.pageSize).then(response => {
        const reqs = response.data;
        this.total = reqs.data.total;
        this.list = reqs.data.rows;
        console.log(this.total, this.list);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        console.log(this.multipleSelection);

        this.$refs.multipleTable.clearSelection();
      }
    },
    handleAgree(bookNum) {
      const arr =
        bookNum == null
          ? this.multipleSelection.map(obj => {
              return obj.bookNum;
            })
          : [bookNum];
      //console.log(arr);
      this.$confirm("确认同意这个预定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          ProcessApi.agreeBooking(arr).then(response => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message
            });
            if (resp.flag) {
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    handleReject(bookNum) {
      const arr =
        bookNum == null
          ? this.multipleSelection.map(obj => {
              return obj.bookNum;
            })
          : [bookNum];
      //console.log(arr);
      this.$confirm("确认同意这个预定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          ProcessApi.rejectBooking(arr).then(response => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message
            });
            if (resp.flag) {
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
</style>