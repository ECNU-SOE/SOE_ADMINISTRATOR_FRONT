<template>
  <div>

    <el-row>
      <el-col :span="6">
        <el-card body-style="padding: 0" style="margin-left: 10px;">
          <el-descriptions title="课程信息" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle" v-model="tableData">
            <el-descriptions-item label="课程名称" span="3" >{{tableData.name}}</el-descriptions-item>
            <el-descriptions-item label="课程编号" span="3">{{tableData.id}}</el-descriptions-item>
            <el-descriptions-item label="课程难度" span="3">
              <el-rate
                v-model="value"
                show-score
                text-color="#ff9900"
                score-template="">
            </el-rate>
              (0-5)
            </el-descriptions-item>
            <el-descriptions-item label="创建日期" span="3">
              {{this.getCurrentTime(tableData.gmtCreate)}}
            </el-descriptions-item>
            <el-descriptions-item label="修改日期" span="3">{{this.getCurrentTime(tableData.gmtModified)}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-left: 1%;">
        <el-row>
          <el-card body-style="padding: 0" style="margin-left: 10px;">
            <el-col :span="3">
              <el-image
                  style="margin: 5%;height: 150px"
                  :src="pictureUrl"></el-image>
            </el-col>
            <el-col :span="6" style="margin-left: 20px;">
            <el-descriptions title="班级信息" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
              <el-descriptions-item label="课程名称" prop="name" span="3" >{{currentClass.name}}</el-descriptions-item>
              <el-descriptions-item label="课程标识" prop="id" span="3">{{currentClass.id}}</el-descriptions-item>
              <el-descriptions-item label="课程描述" prop="description" span="3">{{currentClass.description}}</el-descriptions-item>
              <el-descriptions-item label="创建时间" prop="gmtCreate" span="3">{{currentClass.gmtCreate}}</el-descriptions-item>
              <el-descriptions-item label="结束时间" prop="gmtModified" span="3">{{currentClass.gmtModified}}</el-descriptions-item>
            </el-descriptions>
            </el-col>
            <el-col :span="1">
            <el-button size="small" type="primary" icon="el-icon-delete" @click="updateClass()" style="position: absolute;margin-top:3%;margin-left: -4%;">
              更换班级
            </el-button>
            </el-col>
            <el-col :span="3">
            <el-card style="position: absolute;margin-left: 20%;">
              <el-input  type="textarea"></el-input>
            </el-card>
            </el-col>
          </el-card>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-card style="margin-left: 10px;">
          <el-radio v-model="radio" label="1" border size="medium" style="display: block;margin-top: 20px;width: 80%;margin-left:30px;height: 50px;">课程设置</el-radio>
          <el-radio v-model="radio" label="2" border size="medium" style="display: block;margin-top: 20px;width: 80%;margin-left:30px;height: 50px;">班级管理</el-radio>
          <el-radio v-model="radio" label="3" border size="medium" style="display: block;margin-top: 20px;width: 80%;margin-left:30px;height: 50px;">资料管理</el-radio>
          <el-radio v-model="radio" label="4" border size="medium" style="display: block;margin-top: 20px;width: 80%;margin-left:30px;height: 50px;">数据统计</el-radio>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-left: 1%;">
        <el-tabs type="border-card" style="width: 59%;" :stretch=true>
          <el-tab-pane label="用户管理">
            <div style="margin: 5px;height: 35px;">
              <label>共计10个人</label>
              <el-button size="small" type="primary" icon="el-icon-edit" @click="addStudent()" style="position: absolute;margin-left: 48%;width: 10%;">
                添加学生
              </el-button>
              <el-button size="small" type="primary" icon="el-icon-upload2" @click="exportXls()" style="position: absolute;margin-left: 60%;width: 10%;">
                导出名单
              </el-button>
              <el-input style="position: absolute;width: 15%;margin-left: 72%;" placeholder="请输入学号或者姓名"></el-input>
            </div>
            <el-table :data="classInfoList" border style="margin-bottom: 20px;">
              <el-table-column prop="phone" label="手机号" width="120" align="center"/>
              <el-table-column prop="nickName" label="用户名称" width="100" align="center"/>
              <el-table-column prop="realName" label="真实姓名" width="100" align="center"/>
              <el-table-column prop="sex" label="性别" width="100" align="center"/>
              <el-table-column prop="sex" label="性别" width="100" align="center"/>
              <el-table-column prop="firstLanguage" label="母语" width="100" align="center"/>
              <el-table-column prop="mail" label="用户邮箱" width="150" align="center"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教学团队">教学团队</el-tab-pane>
          <el-tab-pane label="考试作业">
            <div style="width: 100%;margin:5px;">
              <el-radio v-model="radio" label="all" size="mini">全部</el-radio>
              <el-radio v-model="radio" label="notStart" size="mini">未开始</el-radio>
              <el-radio v-model="radio" label="processing" size="mini" >进行中</el-radio>
              <el-radio v-model="radio" label="stopped" size="mini" >已结束</el-radio>
              <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit()" style="margin-left: 30%;">
                新建作业
              </el-button>
              <el-button size="small" type="primary" icon="el-icon-delete" @click="handleDelete()">
                语料组库
              </el-button>
            </div>
            <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex">
              <el-card style="margin-top: 1%;width: 47%; float: left;margin-left: 2%;margin-bottom: 1%;">
                <el-image
                    style="width: 100px; height: 100px;position: absolute;margin-left: 30%;margin-top: 4%;scale: 1.6;"
                    :src="url"></el-image>
                <el-descriptions title="课程信息" :contentStyle="contentStyle" :labelStyle="labelStyle">
                  <el-descriptions-item label="课程名称" prop="name" span="3" >{{subItem.name}}</el-descriptions-item>
                  <el-descriptions-item label="课程标识" prop="id" span="3">{{subItem.id}}</el-descriptions-item>
                  <el-descriptions-item label="课程描述" prop="description" span="3">{{subItem.description}}</el-descriptions-item>
                  <el-descriptions-item label="创建时间" prop="gmtCreate" span="3">{{subItem.gmtCreate}}</el-descriptions-item>
                  <el-descriptions-item label="结束时间" prop="gmtModified" span="3">{{subItem.gmtModified}}</el-descriptions-item>
                </el-descriptions>
                <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(subIndex)">
                  修改
                </el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(subIndex)">
                  删除
                </el-button>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="班级讨论">班级讨论</el-tab-pane>
          <el-tab-pane label="资料管理">资料管理</el-tab-pane>
          <el-tab-pane label="班级设置">班级设置</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

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


    <!-- 更换班级弹出框 -->
    <el-dialog title="更换班级" :visible.sync="updateClassVisible" width="30%">
      <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex">
        <el-card @click.native="selectClass($event,subIndex)">
          <el-descriptions title="班级信息" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
            <el-descriptions-item label="课程名称" prop="name" span="3" >{{subItem.name}}</el-descriptions-item>
            <el-descriptions-item label="课程标识" prop="id" span="3">{{subItem.id}}</el-descriptions-item>
            <el-descriptions-item label="课程描述" prop="description" span="3">{{subItem.description}}</el-descriptions-item>
            <el-descriptions-item label="创建时间" prop="gmtCreate" span="3">{{subItem.gmtCreate}}</el-descriptions-item>
            <el-descriptions-item label="结束时间" prop="gmtModified" span="3">{{subItem.gmtModified}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      <el-card>
        <span class="el-icon-plus" @click="handleDelete()">
         新建班级
        </span>
      </el-card>
      <template #footer>
                <span class="dialog-footer">
                    <label style="margin-right: 20%;">共有2个班级可选</label>
                    <el-button @click="updateClassVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加学生弹出框 -->
    <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="38%">
      <div style="min-height: 500px;">
        <el-tabs type="border-card" :stretch=true style="width: 35%;">
          <el-tab-pane label="手动导入">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="姓名" style="margin-left:5px;">
                <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-edit" @click="addStudent()" style="margin-left:5px;">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="classInfoList" border style="margin-bottom: 20px;">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="120" align="center"/>
              <el-table-column prop="nickName" label="用户名称" width="100" align="center"/>
              <el-table-column prop="realName" label="真实姓名" width="100" align="center"/>
              <el-table-column prop="sex" label="性别" width="100" align="center"/>
              <el-table-column prop="sex" label="性别" width="100" align="center"/>
              <el-table-column prop="firstLanguage" label="母语" width="100" align="center"/>
              <el-table-column prop="mail" label="用户邮箱" width="150" align="center"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="批量导入">
          </el-tab-pane>
          <el-tab-pane label="课程导入">
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addStudentVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import {
  addCourse,
  updateCourse,
  deleteCourse,
  getCurrentCourseInformation
} from '@/api/system/sys_course.js';
import {
  getClassInformation
} from '@/api/system/sys_class.js'

import {getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "course",

  data(){
    return {
      courseId:sessionStorage.getItem("courseId"),
      value:4,
      materialQueryForm:{
        idLike: ""
      },
      formInline:{
        name:'',
        phone:''
      },
      tableData:[],
      classInfoList:[],
      currentClass:{},
      dialogTitle:'',
      selectIndex:-1,
      formObj:{
        id:"",
        name: "",
        description: "",
        gmtCreate:"",
        gmtModified:""
      },
      formObjRules:{
        name:[{required: true, message: '请输入课程名字',trigger:'blur'}]
      },
      pictureUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      groupsInfo:{
        name:"",
        type: "",
        description: "",
        gmtCreate:"",
        gmtModified:""
      },
      editVisible:false,
      updateClassVisible:false,
      addStudentVisible:false,
      query:{
        cur: 1,
        size: 20,
      },
      url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      contentStyle:{
        "text-align":"center;"
      },
      labelStyle:{
        "text-align":"center;",
        "margin-left":"5px"
      },
      radio:"tabs",
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

  created() {
    this.getCourseList();
    this.getClassList();
  },

  mounted() {

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
      getCurrentCourseInformation({id:this.courseId}).then((res)=>{
        this.setData(res);
      })
    },

    getClassList(){
      getClassInformation({id:this.courseId}).then((res)=>{
        this.setClassData(res);
      })
    },

    setData(data){
      if(data){
        this.tableData = data.data;
      }
    },

    setClassData(data){
      if(data){
        this.classInfoList = [{name:"1班",id:"123",description:"123",gmtCreate:"2022-01-01",gmtModified:"2022-02-01"},{name:"2班",id:"1234",description:"123",gmtCreate:"2022-01-01",gmtModified:"2022-02-01"}];
        this.currentClass = this.classInfoList[0];
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
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time);
    },

    updateClass(){
      this.updateClassVisible = true;
    },

    selectClass($event,index){
      $event.currentTarget.className += " active"
      console.log(index);
    },

    addStudent(){
      this.addStudentVisible = true;
    },

    exportXls(){

    }

  }
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}

/*.active {*/
/*  background-color: black;*/
/*}*/

</style>
