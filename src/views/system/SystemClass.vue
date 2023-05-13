<template>
  <div>

    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级标识" prop="roleLike">
              <el-input v-model="materialQueryForm.idLike"
                        placeholder="请输入班级标识"/>
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
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加班级</el-button>

      <el-table :data="tableData" border class="table"  ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="班级标识" align="center"></el-table-column>
        <el-table-column prop="name" label="班级名称" align="center"></el-table-column>
        <el-table-column prop="description" label="班级描述" align="center"></el-table-column>
        <el-table-column prop="level" label="班级难度" align="center"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="gmtModified" label="修改时间" align="center"></el-table-column>
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
      <el-form label-width="120px" :rules="formRules" :model="form">
        <el-form-item label="课程ID" prop="courseId">
          <el-select v-model="form.courseId" >
            <el-option
                v-for="item in courseIdOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="班级描述">
          <el-input v-model="form.description" ></el-input>
        </el-form-item>
        <el-form-item label="班级难度">
          <el-input-number v-model="form.level" ></el-input-number>
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

import { getClassInformation,addClass,updateClass,deleteClass,getCurrentClassInformation } from '@/api/system/sys_class.js'
import {getCourseInformation} from '@/api/system/sys_course.js'
export default {
  name: "class",

  data(){
    return {
      materialQueryForm:{
        idLike: ""
      },
      tableData:[],
      dialogTitle:'',
      form:{
        id:"",
        courseId:"",
        level: "",
        description:"",
        name:""
      },
      formRules:{
        courseId:[ {required: true, message: '请输入课程标识',trigger:'blur'}]
      },
      groupsInfo:{
        name:"",
        type: "",
        description: "",
        startTime:"",
        endTime:""
      },
      courseIdOptions:[],
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
        getCurrentClassInformation({id:this.materialQueryForm.idLike}).then((res)=>{
          this.tableData = [];
          this.tableData.push(res.data)
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        this.getClassList();
      }
    },

    getClassList(){
      getClassInformation({}).then((res)=>{
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
      if(!this.form.courseId){
        this.$message({message: "班级所属的课程id不能为空.", type: 'warning'});
        return false;
      }
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
      this.getCourseIdList();
      this.dialogTitle = "修改班级"
      Object.keys(this.form).forEach((item) => {
        this.form[item] = row[item];
      });
    },

    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let deleteItem = this.tableData[index];
      this.$confirm("确定要删除吗？").then(() => {
        deleteClass(deleteItem).then((res) => {
          if(res.code !== 0){
            this.$message({message: "删除失败!", type: 'error'});
            return;
          }
          this.getClassList();
          this.$message({message: "删除成功!", type: 'success'});
        }).catch((e)=>{
          this.$message({message: `删除失败，原因为${e}`, type: 'error'});
        });
      }).catch(() => {});
    },

    handleAdd(){
      this.dialogTitle = '新增班级';
      this.clear(this.form);
      this.editVisible = true;
      this.getCourseIdList();
    },


    submitForm(){
      if(this.form){
        if(this.form.id){
          updateClass(this.form).then((res) => {
            if(res.code !== 0){
              this.$message({message: "修改失败!", type: 'error'});
              return;
            }
            this.getClassList();
            this.$message({message: "修改成功!", type: 'success'});
          }).catch((e)=>{
            this.$message({message: `修改失败，原因为${e}`, type: 'error'});
          });
        }else {
          addClass(this.form).then((res) => {
            if(res.code !== 0){
              this.$message({message: "添加失败!", type: 'error'});
              return;
            }
            this.getClassList();
            this.$message({message: "添加成功!", type: 'success'});
          }).catch((e)=>{
            this.$message({message: `添加失败，原因为${e}`, type: 'error'});
          });
        }
      }
    },


    getCourseIdList(){
      getCourseInformation({}).then((res)=>{
       let records = res.data.records;
       this.courseIdOptions = [];
       records.forEach(it=>{
         this.courseIdOptions.push({value:it.id,label:it.name})
       })
      }).catch((e)=>{
        this.courseIdOptions = [];
        console.log(e);
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    getClassInformation({}).then(res => {
      next(vm => vm.setData(res))
    });
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}

.el-select {
  display: block;
}
</style>
