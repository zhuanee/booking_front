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
          <el-button size="mini" @click="handleWatch(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleBook(scope.row)">预定</el-button>
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

    <el-dialog title="教室查看" :visible.sync="calendarFormVisible">
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <p
            :class="data.isSelected ? 'is-selected' : ''"
          >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
        </template>
      </el-calendar>
    </el-dialog>

    <el-dialog title="教室预定" :visible.sync="dialogFormVisible" width="700px">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :rules="rules"
        :model="bookTime"
      >
        <el-form-item label="预定时间" prop="value">
          <el-date-picker
            v-model="bookTime.value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="roomBook('pojoForm')"
        >确 定</el-button>
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
        floor: "",
        startTime: "",
        endTime: ""
      },
      bookTime:
      {
        value: [new Date(), new Date()]
      },
      dialogFormVisible: false,
      calendarFormVisible: false,
      rules: {
        value: [{ required: true, message: "日期不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.fetchData();
  },

  components: {},

  methods: {
    fetchData() {
      BookingApi.getClassrooms().then(response => {
        console.log(response.data.rows);
        const reps = response.data;
        this.list = reps.data;
      });
    },
    fetchData2() {
      MemberApi.search(this.currentPage, this.pageSize, this.searchMap).then(
        response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          console.log(this.total, this.list);
        }
      );
    },
    handleWatch(id) {
      this.calendarFormVisible = true;
      console.log(id);
    },
    handleBook(id) {
      this.dialogFormVisible = true;
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
    roomBook(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.bookTime.value)
          this.dialogFormVisible = false;
        } else {
          // 验证不通过
          return false;
        }
      })
    }
  }
};
</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>