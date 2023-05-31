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
      <el-form style="white-space: nowrap;">
        <div v-for="(subItem,subIndex) in tableData" :key="subIndex">
          <el-card style="margin-top: 1%;width: 47%; float: left;margin-left: 2%;margin-bottom: 1%;">
            <el-image
                style="width: 100px; height: 100px;position: absolute;margin-left: 30%;margin-top: 4%;scale: 1.6;"
                :src="subItem.picture || url"></el-image>
            <el-descriptions title="课程信息" :contentStyle="contentStyle" :labelStyle="labelStyle">
              <el-descriptions-item label="课程名称" prop="name" span="3" >{{subItem.name}}</el-descriptions-item>
              <el-descriptions-item label="课程标识" prop="id" span="3">{{subItem.id}}</el-descriptions-item>
              <el-descriptions-item label="课程描述" prop="description" span="3">{{subItem.description}}</el-descriptions-item>
              <el-descriptions-item label="创建时间" prop="gmtCreate" span="3">{{getCurrentTime(subItem.gmtCreate)}}</el-descriptions-item>
              <el-descriptions-item label="修改时间" prop="gmtModified" span="3">{{getCurrentTime(subItem.gmtModified)}}</el-descriptions-item>
            </el-descriptions>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(subIndex)">
              修改
            </el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(subIndex)">
              删除
            </el-button>
          </el-card>
        </div>
      </el-form>
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
        <el-form-item label="创建时间">
          <el-date-picker
              v-model="formObj.gmtCreate"
              type="date"
              placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-date-picker
              v-model="formObj.gmtModified"
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
import {getCurrentTimeStr} from "@/lib/utils";

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
        gmtCreate:"",
        gmtModified:""
      },
      contentStyle:{"text-align": "center"},
      labelStyle:{"text-align": "center"},
      formObjRules:{
        name:[{required: true, message: '请输入课程名字',trigger:'blur'}]
      },
      groupsInfo:{
        name:"",
        type: "",
        description: "",
        gmtCreate:"",
        gmtModified:""
      },
      pageTotal:0,
      editVisible:false,
      query:{
        cur: 1,
        size: 20,
      },
      url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
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
      let id = this.tableData[index].id;
      this.$router.push({path:"/home/syscoursedetail",query:{id}})
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
          this.$message({message: `删除失败，原因为${e.msg}`, type: 'error'});
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
            this.$message({message: `修改失败，原因为${e.msg}`, type: 'error'});
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
            this.$message({message: `添加失败，原因为${e.msg}`, type: 'error'});
          });
        }
      }
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time);
    }

  },

  beforeRouteEnter(to, from, next) {
    getCourseInformation({}).then(res => {
      next(vm => vm.setData(res))
    });
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}

.el-input {
  width: 80%;
}
</style>
