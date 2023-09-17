<template>
  <div>

    <el-row>
      <el-col :span="6">
        <el-card body-style="padding: 0" style="margin-left: 0.06rem;">
          <el-upload
              style="width:100%;text-align: center;margin-top: 0.25rem;"
              action=""
              :show-file-list="false"
              :on-success="updateClassPic"
              :before-upload="beforeUpload">
            <el-image
                style="height: 0.8rem;margin-bottom: 0.15rem;scale: 1.2;"
                :src="tableData.picture || url" @click="updateClassPic()"></el-image>
          </el-upload>
          <el-descriptions title="" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle" v-model="tableData">
            <el-descriptions-item label="课程名称" span="3" >{{tableData.name}}</el-descriptions-item>
            <el-descriptions-item label="课程编号" span="3">{{tableData.id}}</el-descriptions-item>
            <el-descriptions-item label="课程难度" span="3">
              <el-rate
                v-model="value"
                show-score
                disabled
                text-color="#ff9900"
                score-template="">
            </el-rate>
              (0-10)
            </el-descriptions-item>
            <el-descriptions-item label="创建者" span="3">{{tableData.creator}}</el-descriptions-item>
            <el-descriptions-item label="创建日期" span="3">
              {{this.getCurrentTime(tableData.gmtCreate)}}
            </el-descriptions-item>
            <el-descriptions-item label="修改日期" span="3">{{this.getCurrentTime(tableData.gmtModified)}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card style="margin-left: 0.05rem;">
          <el-radio v-model="radio" label="1" border size="medium" style="display: block;margin-top: 0.1rem;width: 80%;margin-left:0.15rem;height: 0.25rem;text-align: center;">课程设置</el-radio>
          <el-radio v-model="radio" label="2" border size="medium" style="display: block;margin-top: 0.1rem;width: 80%;margin-left:0.15rem;height: 0.25rem;text-align: center;">班级管理</el-radio>
          <el-radio v-model="radio" label="3" border size="medium" style="display: block;margin-top: 0.1rem;width: 80%;margin-left:0.15rem;height: 0.25rem;text-align: center;">资料管理</el-radio>
          <el-radio v-model="radio" label="4" border size="medium" style="display: block;margin-top: 0.1rem;width: 80%;margin-left:0.15rem;height: 0.25rem;text-align: center;">数据统计</el-radio>
        </el-card>
      </el-col>
      <el-col :span="17" style="margin-left: 1%;">
        <classSet v-if="radio === '2'"></classSet>
        <div v-if="radio === '4'" style="overflow-y: auto;">
          <el-card><chartTop></chartTop></el-card>
          <el-card style="margin-top: 0.02rem;"><chartCenter></chartCenter></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {
  addCourse,
  updateCourse,
  deleteCourse,
  getCurrentCourseInformation
} from '@/api/system/sys_course.js';

import classSet from "../../components/classSet.vue";
import chartTop from "../../components/echarts/chartTop.vue";
import chartCenter from "../../components/echarts/chartCenter.vue";
import {getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "course",
  components:{classSet,chartTop,chartCenter},

  data(){
    return {
      courseId:sessionStorage.getItem("courseId"),
      value:4,
      materialQueryForm:{
        idLike: ""
      },
      tableData:[],
      dialogTitle:'',
      selectIndex:-1,
      radio:"2",
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
      }).catch(e=>{
        console.log(e.msg)
      })
    },


    setData(data){
      if(data){
        this.tableData = data.data;
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

    beforeUpload(){

    },


    updateClassPic(){

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
