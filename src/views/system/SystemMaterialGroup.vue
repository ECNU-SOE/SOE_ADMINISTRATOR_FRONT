<template>
  <div>
    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="语料组标识" prop="roleLike">
              <el-input v-model="materialQueryForm.classId"
                        placeholder="请输入语料组标识"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
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
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加语料组</el-button>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" >
<!--        <el-table-column prop="id" label="语料组标识" align="center"></el-table-column>-->
<!--        <el-table-column prop="classId" label="课程标识" align="center"></el-table-column>-->
        <el-table-column prop="title" label="语料组名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.title}}
            <el-popover
                placement="top-start"
                title=""
                width="200"
                trigger="hover"
                :content="scope.row.description">
              <i class="el-icon-info" slot="reference"/>
            </el-popover>
          </template>
        </el-table-column>
<!--        <el-table-column prop="description" label="语料组描述" align="center"></el-table-column>-->
        <el-table-column prop="difficulty" label="语料组难度" align="center"></el-table-column>
        <el-table-column prop="releaseStatus" label="发布状态" align="center"></el-table-column>
        <el-table-column prop="modStatus" label="修改状态" align="center">
          <template slot-scope="scope">
            {{ modObj[scope.row.modStatus]}}
          </template>
        </el-table-column>
        <el-table-column prop="isPrivate" label="公开状态" align="center">
          <template slot-scope="scope">
            {{ statusObj[scope.row.isPrivate]}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="语料组类型" align="center">
          <template slot-scope="scope">
            {{ typeObj[scope.row.type]}}
          </template>
        </el-table-column>
<!--        <el-table-column prop="cpsrcdNum" label="题目数量" align="center"></el-table-column>-->
        <el-table-column prop="gmtCreate" label="创建时间" align="center">
          <template slot-scope="scope">
            {{ getCurrentTime(scope.row.gmtCreate)}}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" circle>
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"
                       @click="handleDelete(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑查看语料组弹出框 -->
    <el-dialog :title="dialogTitle" class="editGroups" :visible.sync="editGroupVisible" width="30%">
      <el-form label-width="120px" :rules="selectionsRules" :model="selections">
        <el-form-item label="语料组标题" prop="title">
          <el-input v-model="selections.title" ></el-input>
        </el-form-item>
        <el-form-item label="语料组类型">
          <el-select v-model="selections.type" placeholder="请选择" style="width:100%;">
            <el-option v-for="item in materialGroupOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语料组描述">
          <el-input v-model="selections.description" ></el-input>
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
            <el-option key=0 label="公开" value=1></el-option>
            <el-option key=1 label="私有" value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改状态">
          <el-select v-model="selections.modStatus" >
            <el-option key=0 label="允许修改" value=0></el-option>
            <el-option key=1 label="允许创建者修改" value=1></el-option>
            <el-option key=2 label="不允许创建者修改" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="selections.startTime"
              type="date"
              placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="selections.endTime"
              type="date"
              placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>


    <!-- 添加主题弹出框 -->
    <el-dialog :title="dialogTopicTitle" class="editTopic" :visible.sync="editTopicVisible" width="30%" >
      <div class="topicClass">
        <el-scrollbar style="height:100%">
          <el-form label-width="120px" :rules="topicObjRules" :model="topicObj">
            <el-form-item label="topic次序" prop="tNum">
              <el-input-number v-model="topicObj.tNum"></el-input-number>
            </el-form-item>
            <el-form-item label="大题名称" prop="title">
              <el-input v-model="topicObj.title" ></el-input>
            </el-form-item>
            <el-form-item label="大题分值" prop="score">
              <el-input v-model="topicObj.score" ></el-input>
            </el-form-item>
            <el-form-item label="难度" prop="difficulty">
              <el-input-number v-model="topicObj.difficulty"></el-input-number>
            </el-form-item>
            <el-form-item label="说明" prop="description">
              <el-input v-model="topicObj.description" ></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeTopicDialog">取 消</el-button>
                    <el-button type="primary" @click="handleSaveTopic">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import { showAllLanguageMaterialGroup,deleteLanguageMaterialGroup,getCurrentLanguageMaterialGroup,
  getLanguageMaterial,updateCurrentLanguageMaterialGroup,addTopicInterface,addCurrentLanguageMaterialGroup} from '@/api/system/sys_materialGroup'
import {getJwtToken,getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "materialGroup",

  data(){
    return {
      tableData:[],
      dialogTitle:'',
      dialogMaterialTitle:'',
      dialogTopicTitle:"",
      selectionsObj:{
        id:"",
        title:"",
        type:-1,
        description:"",
        difficulty:0,
        difficulty1:0,
        difficulty2:0,
        topics:[],
        modStatus:-1
      },
      materialGroupOptions:[ {
        value: 1,
        label: '测试'
      }, {
        value: 2,
        label: '试卷'
      }, {
        value: 3,
        label: '作业'
      }],
      topicObj:{
        id:"",
        cpsgrpId:"",
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      },
      materialQueryForm:{
        classId: "",
        title:"",
        type:null
      },
      // 表格编辑时弹窗和保存
      editGroupVisible:false,
      editMaterialVisible:false,
      editTopicVisible:false,
      materialsList:[],
      tempList:[],
      token:getJwtToken(),
      selectionsRules:{
        title:[ {required: true, message: '请输入语料组标题',trigger:'blur'}]
      },
      statusObj:{
        0:"公开",
        1:"私有"
      },
      typeObj:{
        1:"测试",
        2:"试卷",
        3:"作业"
      },
      modObj:{
        0:"允许修改",
        1:"允许创建者修改",
        2:"不允许创建者修改"
      },
      topicObjRules:{
        tNum: [
          {required: true, message: '请选择topic次序',trigger:'blur'},
        ],
        title: [
          {required: true, message: '请输入大题名称', trigger: 'blur'},
        ],
        score: [
          {required: true, message: '请输入大题分值', trigger: 'blur'},
        ]
      }
    }
  },

  computed:{
    selections(){
      return this.selectionsObj
    },
  },

  methods:{

    getData(opt={}){
      showAllLanguageMaterialGroup(opt).then((res) => {
        let records = res.data.records;
        this.tableData = records;
        let total = res.data.total;
        this.pageTotal = total || 50;
      }).catch((e)=>{
        this.tableData = [];
        this.pageTotal = 0;
      });
    },
    // 查询操作
    handleSearch(){
      let classId = this.materialQueryForm.classId || "";
      if(classId){
        getCurrentLanguageMaterialGroup({id:classId}).then((res)=>{
          this.tableData = [];
          this.tableData.push(res.data);
        }).catch((e)=>{
          this.tableData = [];
          console.log(e)
        })
      }else {
        this.getData({classId});
      }

    },

    saveEdit(){
      let opt = this.selectionsObj || {};
      opt.token = this.token;
      if(this.selectionsObj.id){
        updateCurrentLanguageMaterialGroup(opt).then((e)=>{
          if(e.data){
            this.$message({message: "更新成功", type: 'success'});
          }
        }).catch((e)=>{
          this.$message({message: e.msg, type: 'error'});
        });
      }else {
        opt.difficulty = opt.difficulty1 + opt.difficulty2;
        opt.startTime = getCurrentTimeStr(opt.startTime);
        opt.endTime = getCurrentTimeStr(opt.endTime);
        addCurrentLanguageMaterialGroup(opt).then((e)=>{
          if(e.data){
            this.$message({message: "添加成功", type: 'success'});
            this.getData();
          }
        }).catch((e)=>{
          this.$message({message: e.msg, type: 'error'});
        });
      }
      this.editGroupVisible = false;
    },


    clearSelectionList(){
      this.selectionsObj ={
        id:"",
        title:"",
        type:"",
        description:"",
        difficulty:0,
        topics:[]
      }
    },

    handleAdd(){
      this.dialogTitle = '新增语料组';
      this.clearSelectionList();
      this.editGroupVisible = true;
    },

    handleEdit(index, row){
      let id = this.tableData[index].id;
      sessionStorage.setItem("cpsrcdId",id)
      this.$router.push({path:"/home/sysmaterialgroupdetail",query:{id}})
    },

    handleSaveTopic(){
      this.topicObj.cpsgrpId = this.selectionsObj.id || '';
      addTopicInterface(this.topicObj).then((res)=>{
        this.$message({message: res.data, type: 'success'});
      }).catch((e)=>{
        this.$message({message: e.msg, type: 'error'});
      });
      this.closeTopicDialog();

    },

    closeTopicDialog(){
      this.editGroupVisible = true;
      this.editTopicVisible = false;
    },


    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let self = this;
      let id = this.tableData[index].id;
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        deleteLanguageMaterialGroup({id,token:self.token}).then((res) => {
          if(res.data === 1){
            this.$message({message: "删除成功", type: 'success'});
            self.getData();
          }else{
            this.$message({message: `删除失败`, type: 'error'});
          }
        }).catch((e)=>{
          console.log(e);
          this.$message({message: `删除失败,原因为${e.msg}`, type: 'error'});
        });
      })
        .catch((e) => { console.log(e);});
    },

    setData(data){
      if(data){
        let records = data.data.records;
        this.tableData = records;
        let total = data.data.total;
        this.pageTotal = total || 50;
      }
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time)
    },

    showDetail(index){
      console.log(index)
    }

  },

  beforeRouteEnter(to, from, next) {
    showAllLanguageMaterialGroup({
      cur: 1,
      size: 30,
    }).then(res => {
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
