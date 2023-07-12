<template>
  <div>
    <el-row>
      <el-card body-style="padding: 0" >
        <el-col :span="6">
          <el-upload
              style="width:100%;text-align: center;margin-top: 7%;"
              action=""
              :show-file-list="false"
              :on-success="updateClassPic"
              :before-upload="beforeUpload">
            <el-image
                style="margin: 5%;height: 150px;"
                :src="pictureUrl"></el-image>
          </el-upload>
        </el-col>
        <el-col :span="8" style="margin-left: 20px;margin-top:20px;">
          <el-descriptions title="" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
            <el-descriptions-item label="班级名称" prop="name" span="3" >{{currentClass.name}}</el-descriptions-item>
            <el-descriptions-item label="班级编号" prop="id" span="3">{{currentClass.id}}</el-descriptions-item>
            <el-descriptions-item label="起止时间" prop="gmtCreate" span="3">{{getCurrentTime(currentClass.gmtCreate) + '~' + getCurrentTime(currentClass.gmtModified)}}</el-descriptions-item>
            <el-descriptions-item label="授课教师" prop="description" span="3">{{currentClass.teacher}}</el-descriptions-item>
            <el-descriptions-item label="班级水平" prop="description" span="3">{{currentClass.level}}</el-descriptions-item>
            <el-descriptions-item label="人数限制" prop="description" span="3">{{currentClass.stuLimit}}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="1">
          <el-button size="small" type="primary" icon="el-icon-refresh" @click="updateClass()" style="position: absolute;margin-top:2%;margin-left: -13%;">
            更换班级
          </el-button>
        </el-col>
        <el-col :span="8" style="margin-left: 5%;">
          <el-card style="margin-top: 8%;">
            <el-input  type="textarea" :autosize="{ minRows: 6}" disabled placeholder="班级公告："></el-input>
            <el-button  size="mini" type="primary" @click="handleUpdateClassInfo($event)" style="position: absolute;margin-left: -10%;margin-top: 12%;">发布公告</el-button>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <el-tabs type="border-card" style="width: 101%;margin-top: 1%;position: relative;" :stretch=true>
      <el-tab-pane label="用户管理">
        <div style="margin: 5px;height: 40px;">
          <label style="margin: 5px;">共{{classMembersNum}}人</label>
          <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addStudent()" style="position: absolute;margin-left: 45%;height: 40px;">
            添加学生
          </el-button>
          <el-button size="small" type="primary" icon="el-icon-upload2" @click="exportXls()" style="position: absolute;margin-left: 57%;height: 40px;">
            导出名单
          </el-button>
          <el-input  class="selectStudent" style="position: absolute;width: 20%;margin-left: 70%;border-radius: 15px;!important;" placeholder="请输入学号或者姓名"></el-input>
          <el-button size="mini" type="text" icon="el-icon-search" @click="exportXls()" style="position: absolute;margin-left: 90%;height: 40px;"/>
        </div>
        <el-table :data="classMembers" border style="margin: 10px 0px 10px 10px;" border stripe>
<!--          <el-table-column prop="id" label="序号" align="center"/>-->
          <el-table-column prop="realName" label="姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.realName}}
              <i :class="sexIcon[scope.row.sex]" slot="reference"/>
            </template>
          </el-table-column>
          <el-table-column prop="identifyId" label="学工号" align="center"/>
          <el-table-column prop="firstLanguage" label="母语" align="center"/>
          <el-table-column prop="rType" label="成员类型" align="center">
            <template slot-scope="scope">
              {{ memberType[scope.row.rtype]}}
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="加入时间" align="center" width="200px">
            <template slot-scope="scope">
              {{ getCurrentTime(scope.row.gmtCreate)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdateMem(scope.$index, scope.row)">更新</el-button>
              /<el-button type="text" @click="handleDeleteMem(scope.$index, scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="教学团队">教学团队</el-tab-pane>
      <el-tab-pane label="考试作业">
        <div style="width: 100%;margin:5px;">
          <el-radio v-model="radio" label="all" size="mini">全部</el-radio>
          <el-radio v-model="radio" label="notStart" size="mini">未开始</el-radio>
          <el-radio v-model="radio" label="processing" size="mini" >进行中</el-radio>
          <el-radio v-model="radio" label="stopped" size="mini" >已结束</el-radio>
          <el-button size="small" type="primary" icon="el-icon-edit" @click="handleAddJob()" style="margin-left: 30%;">
            新建作业
          </el-button>
          <el-button size="small" type="primary" icon="el-icon-delete" @click="handleMaterialGroup()">
            语料组库
          </el-button>
        </div>
        <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex">
          <el-card style="margin-top: 1%;width: 47%; float: left;margin-left: 2%;margin-bottom: 1%;">
            <el-image
                style="width: 100px; height: 100px;position: absolute;margin-left: 30%;margin-top: 4%;scale: 1.6;"
                :src="pictureUrl"></el-image>
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

    <!-- 更换班级弹出框 -->
    <el-dialog title="更换班级" :visible.sync="updateClassVisible" width="30%">
      <div style="max-height: 500px;overflow-y: auto;">
        <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex" style="width: 99%;">
          <el-row>
              <el-card @click.native="selectClass($event,subIndex)" style="margin: 5px;">
                <el-col :span="21">
                  <el-descriptions :title="subItem.name" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
                    <el-descriptions-item label="授课教师" prop="id" span="3" label-class-name="my-content" content-class-name="my-content">{{subItem.teacher}}</el-descriptions-item>
                    <el-descriptions-item label="开始时间" prop="gmtCreate" span="3" label-class-name="my-content" content-class-name="my-content">{{getCurrentTime(subItem.gmtCreate)}}</el-descriptions-item>
                    <el-descriptions-item label="结束时间" prop="gmtModified" span="3" label-class-name="my-content" content-class-name="my-content">{{getCurrentTime(subItem.gmtModified)}}</el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="2">
                  <el-radio v-model="classRadio" :label="subIndex">{{''}}</el-radio>
                </el-col>
              </el-card>
          </el-row>
        </div>
        <el-card @click.native="handleAddClass()" style="width: 97%;margin-left: 5px;">
        <span class="el-icon-plus" >
         新建班级
        </span>
        </el-card>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <label style="margin-right: 20%;">共有{{classNum}}个课程班</label>
                    <el-button @click="updateClassVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveClass">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加学生弹出框 -->
    <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="38%">
      <div style="min-height: 500px;">
        <el-tabs type="border-card" :stretch=true style="width: 35%;">
          <el-tab-pane label="手动导入">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 2%;">
              <el-form-item label="姓名" style="margin-left:5px;">
                <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-edit" @click="getCurrentStudent()" style="margin-left:5px;">查询</el-button>
              </el-form-item>
            </el-form>
            <div style="margin-bottom: 20px;max-height: 400px;overflow-y: auto;">
              <div v-for="(subItem,subIndex) in usersList" :key="subIndex">
                <el-row>
                  <el-card style="margin-top: 1%;width: 96%; float: left;margin-left: 2%;margin-bottom: 1%;">
                    <el-col :span="4">
                      <el-checkbox label="" @change="updateCurrentSelect($event,subIndex)"></el-checkbox>
                    </el-col>
                    <el-col :span="19">
                      <el-descriptions title="" :contentStyle="contentStyle" :labelStyle="labelStyle">
                        <el-descriptions-item label="姓名" prop="realName" >{{subItem.realName}}</el-descriptions-item>
                        <el-descriptions-item label="性别" prop="sex" >{{sexTypeFuc(subItem.sex)}}</el-descriptions-item>
                        <el-descriptions-item label="母语" prop="firstLanguage" >{{subItem.firstLanguage}}</el-descriptions-item>
                        <el-descriptions-item label="学工号" prop="identifyId">{{subItem.identifyId}}</el-descriptions-item>
                        <el-descriptions-item label="手机号" prop="phone">{{subItem.phone}}</el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                  </el-card>
                </el-row>
              </div>
            </div>
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
                    <el-button type="primary" @click="handleSaveStudent">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加学生弹出框 -->
    <el-dialog title="新建班级" :visible.sync="addClassVisible" width="30%" :show-close=false>
      <div>
        <el-form  label-width="120px" :rules="newClassRules" :model="newClass">
          <el-form-item>
            所属班级:{{newClass.courseName}}
          </el-form-item>
          <el-form-item label="班级名称" prop="name" style="margin-left:5px;width: 70%;">
            <el-input v-model="newClass.name" placeholder="请输入班级名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCloseAddClass">取 消</el-button>
                    <el-button type="primary" @click="handleSaveAddClass">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {getUsers,getCurrentUsers} from '@/api/system/sys_user'
import {getClassInformation,getClassMembers,addClass,addClassMembers} from "@/api/system/sys_class";
import {getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "classSet",

  created() {
    this.getClassList();
  },
  data(){
    return {
      courseId:sessionStorage.getItem("courseId"),
      pictureUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      contentStyle:{
        // "text-align":"center"
      },
      contentItemStyle:{

      },
      labelItemStyle:{

      },
      labelStyle:{
        "text-align":"center;",
        "margin-left":"5px"
      },
      classInfoList:[],
      currentClass:{},
      choseClass:{},
      radio:"tabs",
      classRadio:-1,
      formInline:{
        name:'',
        phone:''
      },
      updateClassVisible:false,
      addStudentVisible:false,
      addClassVisible:false,
      classMembers:[],
      classNum:0,
      classMembersNum:0,
      selectUserList:[],
      sexIcon:{0:"el-icon-female",1:"el-icon-male"},
      memberType:{1:"学生",2:"助教",3:"老师",4:"管理员"},
      newClass:{name:"", courseName:sessionStorage.getItem("courseName"),},
      newClassRules:{
        name:[{required: true, message: '请输入班级名字',trigger:'blur'}]
      },
      usersList:[]
    }
  },

  methods: {
    exportXls(){

    },

    sexTypeFuc(idx){
      switch (idx){
        case -1:
          return '未知';
        case 0:
          return '女';
        case 1:
          return '男';
      }
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time);
    },

    updateClass(){
      let idx = -1;
      let item = this.currentClass;
      this.classInfoList.forEach(function (it,index){
        if(it.id === item.id){
          idx = index;
        }
      })
      this.classRadio = idx;
      this.updateClassVisible = true;
    },

    getClassList(){
      getClassInformation({courseId:this.courseId}).then((res)=>{
        this.setClassData(res);
      })
    },

    handleSaveClass(){
      let tempClass = JSON.parse(JSON.stringify(this.choseClass));
      this.currentClass = tempClass;
      this.showClassInfo(tempClass);
      this.updateClassVisible = false;
    },


    selectClass($event,index){
      this.choseClass = JSON.parse(JSON.stringify(this.classInfoList[index]));
    },

    handleAddClass(){
      this.updateClassVisible = false;
      this.addClassVisible = true;
    },


    handleSaveAddClass(){
      addClass({name:this.newClass.name,courseId:this.courseId}).then(res=>{
          if(res.code === 0){
            this.$message({message: "新增班级成功!", type: 'success'});
            this.getClassList();
          }
      }).catch(e=>{
        this.$message({message: `新增班级失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addClassVisible = false;
      this.updateClassVisible = true;
    },

    handleCloseAddClass(){
      this.addClassVisible = false;
      this.updateClassVisible = true;
    },

    addStudent(){
      getUsers({},{pageNum:1,pageSize:999}).then(res=>{
        if(res.code === 0){
          this.usersList = res.data.records;
        }
      }).catch(e=>{
        this.$message({message: `查询用户列表失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addStudentVisible = true;
    },

    handleAddJob(){

    },

    handleMaterialGroup(){

    },

    handleSaveStudent(){
      let tempList = JSON.parse(JSON.stringify(this.selectUserList));
      let classId = this.currentClass.id;
      for(let i = 0; i < tempList.length; i++){
        addClassMembers({accountNo:tempList[i].accountNo,classId,type:1}).then(res=>{
          if(res.data){
            this.$message({message: "添加用户到当前课程成功!", type: 'success'});
            this.getClassList();
          }
        }).catch(e=>{
          this.$message({message: `添加用户到当前课程失败，原因为:${e.msg}`, type: 'error'});
          console.log(e);
        });
      }
      this.addStudentVisible = false;

    },

    handleUpdateMem(){

    },

    handleDeleteMem(){

    },

    showClassInfo(tempObj){
      getClassMembers({classId:tempObj.id}).then(res=>{
        this.classMembers = res.data.records;
        this.classMembersNum = this.classMembers.length;
      }).catch(e=>{

      })
    },


    setClassData(data){
      if(data){
        this.classInfoList = data.data.records;
        let tempObj = JSON.parse(JSON.stringify(this.classInfoList[0])) || {};
        tempObj.gmtCreate = this.getCurrentTime(tempObj.gmtCreate);
        tempObj.gmtModified = this.getCurrentTime(tempObj.gmtModified);
        this.currentClass = tempObj;
        this.classNum = this.classInfoList.length;
       this.showClassInfo(tempObj);
      }
    },

    beforeUpload(){

    },


    updateClassPic(){

    },

    updateCurrentSelect(flag,idx){
      let item = this.usersList[idx]
      if(flag){
        if(!this.selectUserList.find(it=>it.accountNo === item.accountNo)){
          this.selectUserList.push(item);
        }
      }else {
        if(this.selectUserList.find(it=>it.accountNo === item.accountNo)){
          let deleteIdx = this.selectUserList.findIndex(it=>it.accountNo === item.accountNo);
          this.selectUserList.splice(deleteIdx,1);
        }
      }
    },

    getCurrentStudent(){
      getCurrentUsers({account_list:this.formInline.phone}).then(res=>{
        this.usersList = res.data.records;
      }).catch(e=>{

      })
    },

    handleUpdateClassInfo(){

    }

  }
}
</script>

<style scoped>

.active {
  background-color: skyblue;
}

.my-content {
  background: black;
}

.selectStudent>>>.el-input__inner{
  border-radius: 15px;    /*输入框圆角值*/
}

</style>