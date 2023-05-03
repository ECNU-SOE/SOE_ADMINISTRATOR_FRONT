<template>
  <div>

    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="课程标识" prop="roleLike">
              <el-input v-model="materialQueryForm.idLike"
                        placeholder="请输入课程标识"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" size="small"
                         @click="handleSearch()" icon="el-icon-search">
                查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加课程</el-button>

      <el-table :data="tableData" border class="table"  ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="课程标识" align="center"></el-table-column>
        <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
        <el-table-column prop="description" label="课程描述" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
        <!--        <el-table-column prop="gmtCreate" label="创建时间" align="center"></el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle
                       @click="handleEdit(scope.$index, scope.row)"/>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle
                       @click="handleDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 编辑添加语料弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
      <el-form label-width="120px" :rules="formObjRules" :model="formObj">
        <el-form-item label="课程名字" prop="name">
          <el-input v-model="formObj.name" ></el-input>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="formObj.description" ></el-input>
        </el-form-item>
        <el-form-item label="开课时间">
          <el-date-picker
              v-model="formObj.startTime"
              type="date"
              placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="formObj.endTime"
              type="date"
              placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import { getCourseInformation,addCourse,updateCourse,deleteCourse,getCurrentCourseInformation} from '@/api/system/sys_course.js'

export default {
  name: "course",

  data(){
    return {
      materialQueryForm:{
        idLike: ""
      },
      tableData:[],
      dialogTitle:'',
      formObj:{
        id:"",
        name: "",
        description: "",
        startTime:"",
        endTime:""
      },
      formObjRules:{
        name:[{required: true, message: '请输入课程名字',trigger:'blur'}]
      },
      groupsInfo:{
        name:"",
        type: "",
        description: "",
        startTime:"",
        endTime:""
      },
      pageTotal:0,
      editVisible:false,
      query:{
        cur: 1,
        size: 20,
      },
      stateArr:[],
      pageIndex:0,
      set:{
        0:"单字",
        1:"词语",
        2:"句子",
        3:"段落",
        5:"古诗"
      },
    }
  },


  methods:{


    // 查询操作
    handleSearch(){
      this.query.pageIndex = 1;
      if(this.materialQueryForm.idLike){
        getCurrentCourseInformation({id:this.materialQueryForm.idLike}).then((res)=>{
          this.tableData = [];
          this.tableData.push(res.data)
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        this.getCourseList();
      }

    },

    getCourseList(){
      getCourseInformation({}).then((res)=>{
        this.setData(res);
      })
    },

    setData(data){
      if(data){
        this.tableData = data.data.records;
        this.pageTotal = data.data.total || 50;
      }
    },


    saveEdit(){
      this.editVisible = false;
      this.submitForm();
    },

    clear(newForm){
      const keys = Object.keys(newForm);
      let obj = {};
      keys.forEach((item) => {
        obj[item] = "";
      });
      Object.assign(newForm, obj);
    },

    handleEdit(index, row){
      this.editVisible = true;
      this.dialogTitle = "修改课程"
      Object.keys(this.formObj).forEach((item) => {
        this.formObj[item] = row[item];
      });
    },

    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let deleteItem = this.tableData[index];
      this.$confirm("确定要删除吗？").then(() => {
        deleteCourse(deleteItem).then((res) => {
          if(res.code !== 0){
            this.$message({message: "删除失败!", type: 'error'});
            return;
          }
          this.$message({message: "删除成功!", type: 'success'});
          this.getCourseList();
        }).catch((e)=>{
          this.$message({message: `删除失败，原因为${e}`, type: 'error'});
        });
      }).catch(() => {});
    },

    handleAdd(){
      this.dialogTitle = '新增课程';
      this.clear(this.formObj);
      this.editVisible = true;
    },


    submitForm(){
      if(this.formObj){
        if(this.formObj.id){
          updateCourse(this.formObj).then((res) => {
            if(res.code !== 0){
              this.$message({message: "修改失败!", type: 'error'});
              return;
            }
            this.$message({message: "修改成功!", type: 'success'});
            this.getCourseList();
          }).catch((e)=>{
            this.$message({message: `修改失败，原因为${e}`, type: 'error'});
          });
        }else {
          addCourse(this.formObj).then((res) => {
            if(res.code !== 0){
              this.$message({message: "添加失败!", type: 'error'});
              return;
            }
            this.$message({message: "添加成功!", type: 'success'});
            this.getCourseList();
          }).catch((e)=>{
            this.$message({message: `添加失败，原因为${e}`, type: 'error'});
          });
        }
      }
    }

  },

  beforeRouteEnter(to, from, next) {
    getCourseInformation({
      "cur":1,
      "size":5,
      "id":"1"}).then(res => {
      next(vm => vm.setData(res))
    });
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
</style>
