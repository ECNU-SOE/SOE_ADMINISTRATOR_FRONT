<template>
  <div>
    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="课题标识" prop="roleLike">
              <el-input v-model="materialQueryForm.classId"
                        placeholder="请输入课题标识"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语料组主题" prop="title">
              <el-input v-model="materialQueryForm.title" placeholder="请输入语料组主题"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语料组类型" prop="type">
              <el-input v-model="materialQueryForm.type" placeholder="请输入语料组类型"/>
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
        <el-table-column prop="id" label="语料组标识" align="center"></el-table-column>
        <el-table-column prop="classId" label="课程标识" align="center"></el-table-column>
        <el-table-column prop="title" label="语料组主题" align="center"></el-table-column>
        <el-table-column prop="description" label="语料组描述" align="center"></el-table-column>
        <el-table-column prop="type" label="语料组类型" align="center"></el-table-column>
        <el-table-column prop="cpsrcdNum" label="题目数量" align="center"></el-table-column>
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
      <el-form label-width="120px">
        <el-form-item label="语料组名称">
          <el-input v-model="selections.title" ></el-input>
        </el-form-item>
        <el-form-item label="语料组类型">
          <el-select v-model="selections.type" placeholder="请选择" style="width:100%;">
            <el-option key=0 label="单字" value=0></el-option>
            <el-option key=1 label="词语" value=1></el-option>
            <el-option key=2 label="句子" value=2></el-option>
            <el-option key=3 label="段落" value=3></el-option>
            <el-option key=5 label="古诗" value=5></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语料组描述">
          <el-input v-model="selections.description" ></el-input>
        </el-form-item>
<!--        <div class="topicList">-->
<!--          <el-button type="primary"  @click="handleAddTopic()" class="addMaterialBtn" icon="el-icon-plus" size="small">添加主题</el-button>-->
<!--          <div class="selectedListTitle">语料组主题</div>-->
<!--          <el-table :data="selections.topics" header-cell-class-name="table-header"  border  height="250">-->
<!--            <el-table-column prop="title" label="主题名称" align="center"></el-table-column>-->
<!--            <el-table-column prop="score" label="分数" align="center"></el-table-column>-->
<!--            <el-table-column prop="description" label="描述信息" align="center"></el-table-column>-->
<!--            <el-table-column prop="difficulty" label="难度" align="center"></el-table-column>-->
<!--            <el-table-column label="操作" width="180" align="center">-->
<!--              <template #default="scope">-->
<!--                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdateTopic(scope.$index, scope.row)" circle>-->
<!--                </el-button>-->
<!--                <el-button size="mini" type="primary" icon="el-icon-more-outline" @click="openMaterialList(scope.$index, scope.row)" circle>-->
<!--                </el-button>-->
<!--                <el-button size="mini" type="danger" icon="el-icon-delete"-->
<!--                           @click="handleDeleteTopic(scope.$index, scope.row)" circle></el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </div>-->
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>


    <!-- 编辑修改语料弹出框 -->
    <el-dialog :title="dialogMaterialTitle" class="editGroups" :visible.sync="editMaterialVisible" width="30%" >
      <div class="allYuLiaoList">
        <el-scrollbar style="height:100%">
          <el-table :data="allMaterials" header-cell-class-name="table-header"  border  height="250" ref="multipleSelectionsTable" @select="handleSelect" @select-all="handleSelectAll">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="语料标识" align="center"></el-table-column>
            <el-table-column prop="name" label="语料名称" align="center"></el-table-column>
            <el-table-column prop="pinyin" label="拼音" align="center"></el-table-column>
            <el-table-column prop="refText" label="文本" align="center"></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeSelectMaterials">取 消</el-button>
                    <el-button type="primary" @click="saveSelectMaterials">确 定</el-button>
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
import {getJwtToken} from "@/lib/utils";

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
        type:"",
        description:"",
        difficulty:0,
        topics:[]
      },
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
    groupNum(){
      return new Set(this.tableData.map(o => o.type));
    },

    selections(){
      return this.selectionsObj
    },

    allMaterials(){
      return this.materialsList
    }
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
      let title = this.materialQueryForm.title || "";
      let type = this.materialQueryForm.type;
      this.getData({classId,title,type});
    },
    // 分页导航
    handlePageChange(val){
      this.getData({pageIndex:val});
    },

    typeListLth(name){
      return this.tableData.filter(o => o.type === name).length;
    },
    classNameLen(name){  //根据班级名称获取该班级第一个学生在全量学生中的偏移位置
      const tmp = Array.from(this.groupNum);
      const index = tmp.indexOf(name);  //某班级在全班级中的偏移位置
      let len = 0;
      for (let i = 0;i < index;i++){
        len += this.typeListLth(tmp[i]);
      }
      return len;
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
          this.$message({message: e.message, type: 'error'});
        });
      }else {
        addCurrentLanguageMaterialGroup(opt).then((e)=>{
          if(e.data){
            this.$message({message: "添加成功", type: 'success'});
            this.getData();
          }
        }).catch((e)=>{
          this.$message({message: e.message, type: 'error'});
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

    clearTopicInformation(){
      this.topicObj = {
        id:"",
        cpsgrpId:"",
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      }
    },

    handleAdd(){
      this.dialogTitle = '新增语料组';
      this.clearSelectionList();
      this.editGroupVisible = true;
    },

    handleEdit(index, row){
      let id = this.tableData[index].id;
      this.$router.push({path:"/home/sysmaterialgroupdetail",query:{id:id}})
      // this.dialogTitle = "修改语料组信息";
      // getCurrentLanguageMaterialGroup({id}).then((res)=>{
      //   this.editGroupVisible = true;
      //   this.clearSelectionList();
      //   let data = res.data;
      //   this.selectionsObj.id = data.id;
      //   this.selectionsObj.title = data.title;
      //   this.selectionsObj.type = data.type;
      //   this.selectionsObj.description = data.description;
      //   for(let i in data.topics){
      //     this.selectionsObj.topics.push({
      //       title:data.topics[i].title,score:data.topics[i].score,
      //       description:data.topics[i].description,difficulty:data.topics[i].difficulty})
      //   }
      // }).catch((e)=>{
      //   this.clearSelectionList();
      //   console.log(e);
      // })
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
            this.$message({message: `删除失败,原因为${e}`, type: 'error'});
          }
        }).catch((e)=>{
          console.log(e);
          this.$message({message: `删除失败,原因为${e}`, type: 'error'});
        });
      })
        .catch((e) => { console.log(e);});
    },

    openMaterialList(){
      let list = this.selectionsObj.topics;
      this.dialogMaterialTitle = '查看语料信息';
      getLanguageMaterial({cur: 1, size: 20}).then((res) => {
        if(res.code !== 0){
          console.log("数据为空")
          return;
        }
        let data = res.data;
        this.materialsList = data.records;
        this.$refs.multipleSelectionsTable.clearSelection();
        list.forEach(it=>{
          this.$refs.multipleSelectionsTable.toggleRowSelection(it,true);
        })

      }).catch((e)=>{
        this.materialsList = [];
      });
      this.editGroupVisible = false;
      this.editMaterialVisible = true;
    },

    saveSelectMaterials(){
      this.selectionsObj.topics = this.tempList;
      this.editMaterialVisible = false;
      this.editGroupVisible = true;
    },

    closeSelectMaterials(){
      this.editMaterialVisible = false;
      this.editGroupVisible = true;
    },

    handleSelect(selection, row){
      this.tempList = selection.flat()
    },
    handleSelectAll(selection){
      this.tempList = selection.flat()
    },

    setData(data){
      if(data){
        let records = data.data.records;
        this.tableData = records;
        let total = data.data.total;
        this.pageTotal = total || 50;
      }
    },

    handleAddTopic(){
      this.clearTopicInformation();
      this.dialogTopicTitle='添加主题';
      this.editGroupVisible = false;
      this.editTopicVisible = true;
    },

    handleDeleteTopic(){

    },

    handleUpdateTopic(){
      this.dialogTopicTitle='更新主题';
      this.editGroupVisible = false;
      this.editTopicVisible = true;
    },

    handleSaveTopic(){
      this.topicObj.cpsgrpId = this.selectionsObj.id || '';
      if(this.topicObj.id){
        updateTopic(this.topicObj).then((res)=>{
          this.$message({message: res.data, type: 'success'});
        }).catch((e)=>{
          this.$message({message: e.message, type: 'error'});
        });
      }else {
        addTopicInterface(this.topicObj).then((res)=>{
          this.$message({message: res.data, type: 'success'});
        }).catch((e)=>{
          this.$message({message: e.message, type: 'error'});
        });
      }
      this.closeTopicDialog();

    },

    closeTopicDialog(){
      this.editGroupVisible = true;
      this.editTopicVisible = false;
    },


    spanMethod(data){

    },
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

.selectedListTitle {
  position: absolute;
  margin-left: 219px;
  margin-top: -28px;
  font-size: 16px;
}
</style>
