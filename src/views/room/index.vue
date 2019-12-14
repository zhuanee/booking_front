<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px;">
      <!-- 有prop才可以重置 -->
      <el-form-item prop="roomNum">
        <el-input v-model="searchMap.roomNum" placeholder="教室编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="adminName">
        <el-input v-model="searchMap.adminName" placeholder="管理员名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="floor">
        <el-select v-model="searchMap.floor" placeholder="教室楼层" style="width: 110px">
          <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
          <el-option
            v-for="item in floorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="size">
        <el-select v-model="searchMap.size" placeholder="教室大小" style="width: 110px">
          <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
          <el-option
            v-for="item in sizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" height="570" border style="width: 100%">
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="roomNum" label="教室编号"></el-table-column>
      <el-table-column prop="adminName" label="管理员姓名"></el-table-column>
      <el-table-column prop="floor" label="教室楼层" width="120"></el-table-column>
      <el-table-column prop="size" label="教室大小"></el-table-column>
      <el-table-column prop="seatNum" label="教室座位数"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)">删除</el-button>
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

    <el-dialog title="教室信息编辑" :visible.sync="dialogFormVisible" width="500px">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :rules="rules"
        :model="pojo"
      >
        <el-form-item label="教室编号" prop="roomNum">
          <el-input v-model="pojo.roomNum" />
        </el-form-item>
        <el-form-item label="管理员姓名" prop="adminName">
          <el-input v-model="pojo.adminName" />
        </el-form-item>
        <el-form-item label="教室座位数" prop="seatNum">
          <el-input v-model="pojo.seatNum" />
        </el-form-item>

        <el-form-item label="教室楼层" prop="floor">
          <el-select v-model="pojo.floor" placeholder="教室楼层" style="width: 110px">
            <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
            <el-option
              v-for="item in floorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室大小" prop="size">
          <el-select v-model="pojo.size" placeholder="教室大小" style="width: 110px">
            <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
            <el-option
              v-for="item in sizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id === null? roomAdd('pojoForm'): roomEdit('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BookingApi from "@/api/booking";
const sizeOptions = [
  {
    value: "大",
    label: "大"
  },
  {
    value: "中",
    label: "中"
  },
  {
    value: "小",
    label: "小"
  }
];

const floorOptions = [
  {
    value: "一",
    label: "一"
  },
  {
    value: "二",
    label: "二"
  },
  {
    value: "三",
    label: "三"
  }
];

export default {
  data() {
    return {
      sizeOptions,
      floorOptions,
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        roomNum: "",
        adminName: "",
        size: "",
        floor: ""
      },
      pojo: {
        id: null,
        roomNum: "",
        adminName: "",
        size: "",
        floor: "",
        seatNum: ""
      },
      dialogFormVisible: false,
      calendarFormVisible: false,
      rules: {
        roomNum: [
          { required: true, message: "教室编号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },

  components: {},

  methods: {
    /*fetchData() {
      BookingApi.getClassrooms().then(response => {
        console.log(response.data.data);
        const reps = response.data;
        this.list = reps.data;
      });
    },*/
    fetchData() {
      BookingApi.search(this.currentPage, this.pageSize, this.searchMap).then(
        response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          console.log(this.total, this.list);
        }
      );
    },
    handleAdd() {
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调
        //用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },
    handleEdit(id) {
      this.handleAdd()

      BookingApi.getRoomById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
          console.log(resp.data);
        }
      });

      console.log(id);
    },
    handleDele(id) {
      this.$confirm("确认删除这个教室吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          BookingApi.deleteRoomById(id).then(response => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message
            });
            if (resp.flag) {
              // 删除成功，刷新列表
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    roomEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          BookingApi.updateRoom(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false; //关闭窗口
              this.$message({
                message: resp.message,
                type: "success"
              });
            } else {
              // 失败, 弹出提示
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    },
    roomAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          BookingApi.addRoom(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false; //关闭窗口
              this.$message({
                message: resp.message,
                type: "success"
              });
            } else {
              // 失败, 弹出提示
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>