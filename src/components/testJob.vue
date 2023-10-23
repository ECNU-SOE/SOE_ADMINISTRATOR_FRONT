<template>
  <div>
    <el-row>
      <div v-if="classDetail === false">
        <div style="width: 100%;margin:0.1rem;">
          <el-radio-group v-model="radio" @input="selectMaterialGroupList">
            <el-radio :label=null size="mini">全部</el-radio>
            <el-radio :label=1 size="mini">未开始</el-radio>
            <el-radio :label=2 size="mini" >进行中</el-radio>
            <el-radio :label=3 size="mini" >已结束</el-radio>
          </el-radio-group>
          <el-button size="small" type="primary" icon="el-icon-edit" @click="handleAddJob()" style="margin-left: 30%;">
            新建作业
          </el-button>
          <el-button size="small" type="primary" icon="el-icon-delete" @click="handleMaterialGroup()">
            语料组库
          </el-button>
        </div>
        <div v-for="(subItem,subIndex) in testJobData" :key="subIndex">
          <el-card style="margin-top: 1%;width: 30%; float: left;margin-left: 2%;margin-bottom: 1%;">
            <el-descriptions :title="subItem.title" :contentStyle="contentStyle" :labelStyle="labelStyle">
              <el-descriptions-item label="难易程度" prop="id" span="3">{{subItem.difficulty}}</el-descriptions-item>
              <el-descriptions-item label="开始始间" prop="gmtCreate" span="3">{{getCurrentTime(subItem.startTime)}}</el-descriptions-item>
              <el-descriptions-item label="结束时间" prop="gmtModified" span="3">{{getCurrentTime(subItem.endTime)}}</el-descriptions-item>
              <el-descriptions-item label="提交次数" prop="description" span="3">{{0}}</el-descriptions-item>
            </el-descriptions>
            <el-button size="small" type="primary" @click="handleUpdate(subIndex)">
              修改
            </el-button>
            <el-button size="small" type="primary" @click="handleGetDetail(subIndex)">
              查看
            </el-button>
          </el-card>
        </div>
      </div>
      <div v-else>
        <div style=" margin: 0.05rem;height: 0.4rem">
          <el-button size="small" type="primary" icon="el-icon-arrow-left" @click="handleReturnJob()" style="margin: 0.1rem 0 0 0.2rem;" >
            返回
          </el-button>
          <el-select v-model="currentJob.title" style="padding-left: 0.1rem;padding-right: 0.1rem">
            <template v-for="(tagItem,tagIndex) in jobList">
              <option value="tagItem">{{tagItem}}</option>
            </template>
          </el-select>
          <el-radio-group v-model="judgeOrder" style="padding-left: 1.1rem;padding-right: 0.1rem">
            <el-radio-button label="0">按人批阅</el-radio-button>
            <el-radio-button label="1">按题批阅</el-radio-button>
          </el-radio-group>
          <el-input  class="selectStudent" placeholder="请输入姓名"></el-input>
          <el-button class="searchStudent" size="mini" type="text" icon="el-icon-search" @click="searchStudent()"/>
        </div>
        <el-table :data="classMembers" border class="userTable" stripe>
          <el-table-column prop="realName" label="姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.realName}}
              <i :class="sexIcon[scope.row.sex]" slot="reference"/>
            </template>
          </el-table-column>
          <el-table-column prop="identifyId" label="提交时间" align="center">
            <template slot-scope="scope">
              {{ getCurrentTime(scope.row.gmtCreate)}}
            </template>
          </el-table-column>
          <el-table-column prop="firstLanguage" label="状态" align="center"/>
          <el-table-column prop="rType" label="系统打分" align="center"/>
          <el-table-column prop="gmtCreate" label="批阅时间" align="center" width="200px">
            <template slot-scope="scope">
              {{ getCurrentTime(scope.row.gmtCreate)}}
            </template>
          </el-table-column>
          <el-table-column prop="grade" label="人工打分" align="center"/>
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdateMem(scope.$index, scope.row)">批阅</el-button>
              /<el-button type="text" @click="handleDeleteMem(scope.$index, scope.row)">查看报告</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height: 0.3rem;">
          <label style="padding-left: 0.2rem;font-size:0.1rem;">班级人数：4人</label>
          <label style="padding-left: 0.2rem;font-size:0.1rem;">已提交：4人</label>
          <label style="padding-left: 0.2rem;font-size:0.1rem;">带批阅：4人</label>
          <el-button size="small" type="primary" @click="handleUpdate()" style="margin-left: 2rem;">
            批量打分
          </el-button>
          <el-button size="small" type="primary" @click="handleGetDetail()">
            导出成绩
          </el-button>
        </div>
      </div>
    </el-row>

    <!-- 添加作业弹出框 -->
    <el-dialog title="新建作业" :visible.sync="addJobVisible" width="30%" :modal="false">
      <div style="max-height: 2.667rem;overflow-y: auto;">
        <div v-for="(subItem,subIndex) in allJobData" :key="subIndex" style="width: 99%;">
          <el-row>
            <el-card @click.native="selectMaterialGroup($event,subIndex)" style="margin: 0.1rem 0.1rem 0 0.1rem;">
              <el-col :span="21">
                <el-descriptions :title="subItem.title" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
                  <el-descriptions-item label="难易程度" prop="id" span="3">{{subItem.difficulty}}</el-descriptions-item>
                </el-descriptions>
              </el-col>
              <el-col :span="2">
                <el-radio v-model="materialGroupRadio" :label="subIndex">{{''}}</el-radio>
              </el-col>
            </el-card>
          </el-row>
        </div>
        <el-card @click.native="handleAddMaterialGroup()" style="width: 91%;margin: 0.1rem 0 0 0.1rem;">
        <span class="el-icon-plus" >
         新建语料组方案
        </span>
        </el-card>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addJobVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveMaterialGroup">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 设置作业时间弹出框 -->
    <el-dialog title="" :visible.sync="selectJobTimeVisible" width="30%" :modal="false" :show-close=false>
      <div style="max-height: 2.667rem;text-align: center;">
        <el-date-picker
            v-model="selectTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="selectJobTimeVisible = false;addJobVisible=true">取 消</el-button>
                    <el-button type="primary" @click="handleSaveJob">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 编辑查看语料组弹出框 -->
    <el-dialog title="添加语料组方案" class="editGroups" :visible.sync="editGroupVisible" width="30%" :show-close=false :modal="false">
      <el-form label-width="120px" :rules="selectionsRules" :model="selections">
        <el-form-item label="语料组标题" prop="title">
          <el-input v-model="selections.title" ></el-input>
        </el-form-item>
        <el-form-item label="语料组描述">
          <el-input v-model="selections.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="语料组难度">
          <el-select v-model="selections.difficulty1" style="width: 45%;">
            <el-option label="A" value=0>A</el-option>
            <el-option label="B" value=1>B</el-option>
            <el-option label="C" value=2>C</el-option>
            <el-option label="D" value=3>D</el-option>
            <el-option label="E" value=4>E</el-option>
            <el-option label="F" value=5>F</el-option>
            <el-option label="G" value=6>G</el-option>
            <el-option label="H" value=7>H</el-option>
            <el-option label="I" value=8>I</el-option>
            <el-option label="J" value=9>J</el-option>
          </el-select>
          <el-select v-model="selections.difficulty2" style="width: 45%;margin-left: 5%;">
            <el-option value=0>0</el-option>
            <el-option value=1>1</el-option>
            <el-option value=2>2</el-option>
            <el-option value=3>3</el-option>
            <el-option value=4>4</el-option>
            <el-option value=5>5</el-option>
            <el-option value=6>6</el-option>
            <el-option value=7>7</el-option>
            <el-option value=8>8</el-option>
            <el-option value=9>9</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公开情况">
          <el-select v-model="selections.isPrivate" >
            <el-option key=1 label="私有" value=1></el-option>
            <el-option key=0 label="公开" value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改状态">
          <el-select v-model="selections.modStatus" >
            <el-option key=0 label="允许修改" value=0></el-option>
            <el-option key=1 label="允许创建者修改" value=1></el-option>
            <el-option key=2 label="不允许创建者修改" value=2></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCloseAddMaterialGroup">取 消</el-button>
                    <el-button type="primary" @click="handleSaveAddMaterialGroup">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MixinCUD from '@/components/MixinCUD'
import {getCurrentTimeStr, getCurrentTimeStrWithoutHour} from "@/lib/utils";
import {addCurrentLanguageMaterialGroup, showAllLanguageMaterialGroup} from "@/api/system/sys_materialGroup";
import {addMaterialToClass} from "@/api/system/sys_class";
export default {
  name: "testJob",
  mixins: [MixinCUD],
  data() {
    return {
      classDetail:false,
      radio:null,
      contentStyle:{

      },
      labelStyle:{

      },
      tableData:[],
      materialGroupRadio:-1,
      addJobVisible:false,
      selectJobTimeVisible:false,
      editGroupVisible:false,
      selections:{
        id:"",
        title:"",
        type:-1,
        description:"",
        difficulty:null,
        difficulty1:null,
        difficulty2:null,
        topics:[],
        modStatus:null
      },
      selectionsRules:{

      },
      currentJob:{
        id:'',
        title:''
      },
      jobList:[],
      judgeOrder:"0",
      sexIcon:{0:"el-icon-female",1:"el-icon-male"},
      classMembers:[],
      allJobData:[],
      choseMaterial:{},
      selectTime:[]
    }
  },
  props:{
    currentClass:{
      type:Object
    },
    testJobData:{
      type:Array
    }
  },
  methods: {
    getAllJobData(){
      showAllLanguageMaterialGroup({
        cur: 1,
        size: 30
      }).then(res => {
        if(res.data){
          let records = res.data.records;
          this.allJobData = records;
        }
      }).catch((e)=>{
        this.$message({message: `获取语料组失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
    },
    handleAddJob(){
      this.choseMaterial = {};
      this.selectTime = [];
      this.materialGroupRadio = -1;
      this.getAllJobData();
      this.addJobVisible = true;
    },

    handleMaterialGroup(){
      this.$router.push({path:"/home/sysmaterialgroup"})
    },

    handleUpdate(index){
      let id = this.testJobData[index].id;
      sessionStorage.setItem("cpsrcdId",id)
      this.$router.push({path:"/home/sysmaterialgroupdetail",query:{id}})
    },

    handleGetDetail(){
      this.classDetail = true;

    },

    handleReturnJob(){
      this.classDetail = false;
      this.getJobList();
    },

    setData(data){
      if(data.data){
        let records = data.data.records;
        this.$emit('change', records)
      }
    },

    getJobList(opt={}){
      showAllLanguageMaterialGroup(Object.assign({},{
        cur: 1,
        size: 30,
        classId:this.currentClass.id,
      },opt)).then(res => {
       this.setData(res)
      });
    },

    getCurrentTime(time){
      return getCurrentTimeStrWithoutHour(time)
    },

    selectMaterialGroup(e,index){
      //选哪个作业
      this.choseMaterial = JSON.parse(JSON.stringify(this.allJobData[index]));
    },

    handleSaveMaterialGroup(){
        //存选中的作业
      if(Object.keys(this.choseMaterial) && Object.keys(this.choseMaterial).length){
        this.selectJobTimeVisible = true;
        this.addJobVisible = false;
      }else {
        this.$message({message: '请选择语料组之后再点击确定', type: 'warning'});
      }
    },

    handleSaveJob(){
      let obj = Object.assign({},this.choseMaterial);
      if(this.selectTime && this.selectTime.length){
        obj.startTime = this.getCurrentTime(this.selectTime[0]);
        obj.endTime = this.getCurrentTime(this.selectTime[1]);
        obj.cpsgrpId = obj.id;
      }
      obj.classId = this.currentClass.id || '';
      let self = this;
      addMaterialToClass(obj).then((res)=>{
        if(res.data){
          self.selectJobTimeVisible = false;
          self.$message({message: `保存作业成功`, type: 'success'});
          self.getJobList();
        }
      }).catch((e)=>{
        this.$message({message: `保存作业失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      })
    },

    handleAddMaterialGroup(){
      this.selections = {
        id:"",
        title:"",
        type:-1,
        description:"",
        difficulty:null,
        difficulty1:null,
        difficulty2:null,
        topics:[],
        modStatus:null
      };
      this.addJobVisible = false;
      this.editGroupVisible = true;
    },

    handleCloseAddMaterialGroup(){
      this.editGroupVisible = false;
      this.addJobVisible = true;
    },

    handleSaveAddMaterialGroup(){
      //存语料组方案
      let opt = this.selections || {};
      opt.difficulty = opt.difficulty1 + opt.difficulty2;
      addCurrentLanguageMaterialGroup(opt).then((e)=>{
        if(e.data){
          this.$message({message: "添加成功", type: 'success'});
          this.getAllJobData();
        }
      }).catch((e)=>{
        this.$message({message: e.msg, type: 'error'});
      });
      this.editGroupVisible = false;
      this.addJobVisible = true;
    },

    searchStudent(){

    },

    selectMaterialGroupList(status){
      this.getJobList({status:status});
    }

  }
}
</script>

<style scoped>
.selectStudent {
  padding-left: 0.2rem;
  width: 20%;
  border-radius: 0.1rem;
}

.searchStudent{
  padding-left: 0.1rem;
}

.userTable{
  height:2rem;
  overflow-y: hidden;
}

</style>