<template>
<div>
  <el-row>
      <el-form>
        <el-col :span="17">
          <el-form-item label="语料组标识" prop="cpsgrpId">
            <el-input v-model="cpsgrpId"
                      placeholder="请输入语料组标识" :disabled="true" style="position: absolute;margin-left: 20px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="3" style="margin-left:150px">
          <el-form-item>
            <el-button type="primary" size="small"
                       @click="handleSearch()" icon="el-icon-search">
              查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
  </el-row>
  <el-row>
    <el-col :span="4" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);min-height: 500px;">
      <el-form ref="roleQueryForm" :model="formObj">
        <el-form-item :label="'题数'+ formObj.num + '，总分'+formObj.wholeScore" style="margin-left: 20px;">
          <el-button type="primary" size="small"
                     @click="addTopic()" icon="el-icon-circle-plus-outline" style="margin-left: 20px;">
            新增</el-button>
        </el-form-item>
      </el-form>
<!--        <div v-for="(item,index) in formObj.topics" :key="index">-->
<!--          <el-form-item :label="index+1 +'.'+ item.title" :prop="item.title" style="margin-left: 20px;">-->
<!--            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editTopic(index)" circle>-->
<!--            </el-button>-->
<!--            <el-button size="mini" type="danger" icon="el-icon-delete"-->
<!--                       @click="deleteTopic(index)" circle></el-button>-->
<!--          </el-form-item>-->
<!--          <div v-for="(subItem,subIndex) in item.subCpsrcds" :key="subIndex">-->
<!--            <el-form-item :label=subItem.cNum.toString() style="margin-left: 20px;">-->
<!--            </el-form-item>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-form>-->
      <el-tree
          class="filter-tree"
          :data="formObj.topics"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterOrg"
          @node-click="orgNodeClick"
          :highlight-current="true"
          node-key="id"
          ref="topicQueryTree">
      </el-tree>
    </el-col>
    <el-col :span="19" style="margin-left: 2%;">
        <el-card>
<!--          <el-table :data="topicObj" header-cell-class-name="table-header"  border  height="250" ref="multipleSelectionsTable" @select="handleSelect" @select-all="handleSelectAll">-->
<!--            <el-table-column prop="topicObj.tNum" label="topic次序" align="center"></el-table-column>-->
<!--            <el-table-column prop="topicObj.difficulty" label="难度" align="center"></el-table-column>-->
<!--            <el-table-column prop="topicObj.title" label="大题名称" align="center"></el-table-column>-->
<!--            <el-table-column prop="topicObj.score" label="大题分值" align="center"></el-table-column>-->
<!--            <el-table-column prop="topicObj.description" label="说明" align="center"></el-table-column>-->
<!--          </el-table>-->
          <el-form label-width="120px" :model="topicObj">
            <el-form-item label="大题信息" prop="cpsgrpId">
            </el-form-item>
            <el-col :span="8">
              <el-form-item label="topic次序" prop="tNum">
                <el-input-number v-model="topicObj.tNum" :disabled="true"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="难度" prop="difficulty" >
                <el-input-number v-model="topicObj.difficulty" :disabled="true"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 200px;">
              <el-button size="small" type="primary" icon="el-icon-edit" @click="updateTopic()" >
                修改
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteTopic()">
                删除
              </el-button>
            </el-col>
            <el-col :span="19">
            <el-form-item label="大题名称" prop="title">
              <el-input v-model="topicObj.title"  :disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="19">
            <el-form-item label="大题分值" prop="score">
              <el-input v-model="topicObj.score"  :disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="19">
            <el-form-item label="说明" prop="description">
              <el-input v-model="topicObj.description"  :disabled="true"></el-input>
            </el-form-item>
            </el-col>
          </el-form>
        </el-card>
        <el-card style="margin-top: 1%; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
          <el-form>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addCpsrcdId()">
                新增子题
              </el-button>
            </el-form-item>
            <div v-for="(subItem,subIndex) in topicObj.subCpsrcds" :key="subIndex">
              <el-card style="margin-top: 5px;">
                <el-col :span="8">
                <el-form-item label="关联大题id" prop="topicId">
                  <el-input-number v-model="subItem.topicId" :disabled="true"></el-input-number>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="cpsrcd次序" prop="cNum">
                  <el-input-number v-model="subItem.cNum" :disabled="true"></el-input-number>
                </el-form-item>
                </el-col>
                <el-col :span="2" style="margin-left: 200px;">
                  <el-button size="small" type="primary" icon="el-icon-edit" @click="updateCpsrcdId(subIndex)">
                    修改
                  </el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteCpsrcdId(subIndex)">
                    删除
                  </el-button>
                </el-col>
                <el-col :span="19">
                <el-form-item label="评测模式" prop="evalMode">
                  <el-input v-model="subItem.evalMode" :disabled="true"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="19">
                <el-form-item label="评测文本" prop="refText">
                  <el-input v-model="subItem.refText" :disabled="true"></el-input>
                </el-form-item>
                </el-col>
              </el-card>
            </div>
          </el-form>
        </el-card>
    </el-col>
  </el-row>

  <!-- 编辑查看语料组弹出框 -->
  <el-dialog :title="topicTitle" class="editGroups" :visible.sync="editGroupVisible" width="30%" :show-close=false>
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
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeTopic">取 消</el-button>
                    <el-button type="primary" @click="saveTopic">确 定</el-button>
                </span>
    </template>
  </el-dialog>


  <el-dialog :title="cpsrcdTitle" class="editGroups" :visible.sync="editCpsrcdVisible" width="30%" :show-close=false>
    <el-form label-width="120px" :rules="cpsrcdObjRules" :model="cpsrcdObj">
      <el-form-item label="cpsrcd次序" prop="cNum">
        <el-input-number v-model="cpsrcdObj.cNum"></el-input-number>
      </el-form-item>
      <el-form-item label="评测模式" prop="evalMode">
        <el-input v-model="cpsrcdObj.evalMode" ></el-input>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-input v-model="cpsrcdObj.difficulty" ></el-input>
      </el-form-item>
      <el-form-item label="每字分值" prop="wordWeight">
        <el-input-number v-model="cpsrcdObj.wordWeight"></el-input-number>
      </el-form-item>
      <el-form-item label="说明" prop="pinyin">
        <el-input v-model="cpsrcdObj.pinyin" ></el-input>
      </el-form-item>
      <el-form-item label="评测文本" prop="refText">
        <el-input v-model="cpsrcdObj.refText" ></el-input>
      </el-form-item>
      <el-form-item label="示范音频" prop="audioUrl">
        <el-input v-model="cpsrcdObj.audioUrl" ></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input v-model="cpsrcdObj.tags" ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeCpsrcdId">取 消</el-button>
                    <el-button type="primary" @click="saveCpsrcdId">确 定</el-button>
                </span>
    </template>
  </el-dialog>

</div>
</template>

<script>
import {getCurrentLanguageMaterialGroup,addTopicInterface,deleteTopicInterface,updateTopicInterface,
  updateCpsrcdInterface,deleteCpsrcdInterface,addCpsrcdInterface} from '@/api/system/sys_materialGroup';
import axios from "axios";
import {getUsers} from "@/api/system/sys_user";
import {getOrgTree} from "@/api/system/sys_org";
export default {
  name: "SystemMaterialGroupDetail.vue",
  data() {
    return {
      cpsgrpId:this.$route.query.id,
      formObj:{
        title:'',
        description:'',
        type:'',
        difficulty:'',
        isPublic:'',
        topics:[],
        num:0,
        wholeScore:100
      },
      defaultProps: {
        subCpsrcds: 'subCpsrcds',
        label: 'title'
      },
      topicObj:{
        id:"",
        cpsgrpId:this.cpsgrpId,
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      },
      cpsrcdObj:{
        id:"",
        cpsgrpId:"",
        topicId:"",
        cNum:"",
        evalMode:0,
        refText:"",
        difficulty:-1,
        wordWeight:0,
        pinyin:"",
        audioUrl:"",
        tags:""
      },
      tempTopicObj:{},
      tempCpsrcdObj:{},
      topicTitle:'',
      cpsrcdTitle:'',
      editGroupVisible:false,
      editCpsrcdVisible:false,
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
      },
      cpsrcdObjRules:{
        cNum: [
          {required: true, message: '请传入cpsrcd次序',trigger:'blur'},
        ],
        evalMode: [
          {required: true, message: '请传入评测模式',trigger:'blur'},
        ],
        refText:[
          {required: true, message: '请传入评测文本',trigger:'blur'},
        ]
      }
    }
  },
  created() {
    this.getMaterialGroup({id:this.cpsgrpId});
  },
  methods:{

    clearTopicObj(){
      this.topicObj={
        id:"",
        cpsgrpId:this.cpsgrpId,
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      }
    },

    clearTopicsList(){
      this.formObj.topics = [];
    },

    clearCpsrcdObj(){
      this.cpsrcdObj = {
        id:"",
        cpsgrpId:"",
        topicId:"",
        cNum:"",
        evalMode:0,
        refText:"",
        difficulty:-1,
        wordWeight:0,
        pinyin:"",
        audioUrl:"",
        tags:""
      }
    },

    getMaterialGroup(opt){
      let self= this;
      getCurrentLanguageMaterialGroup(opt).then((res)=>{
        self.formObj = res.data;
        self.formObj.num = res.data.topics && res.data.topics.length || 0;
        let score = 100;
        if(self.formObj.num){
          score = 0;
          for(let i = 0;i < self.formObj.num;i++){
            score += res.data.topics[i].score
          }
        }
        self.formObj.wholeScore = score
      }).catch((e)=>{
        console.log(e);
      });
    },

    handleSearch(){
      this.getMaterialGroup({id:this.cpsgrpId});
    },

    addTopic(){
      this.clearTopicObj();
      this.topicTitle = '新建大题'
      this.editGroupVisible = true;
    },

    editTopic(tempObj){
      this.clearTopicObj();
      this.topicObj = tempObj;
    },

    updateTopic(){
      if(!this.topicObj.id){
        this.$alert("请先选择大题，方可修改此大题")
        return;
      }
      this.tempTopicObj = JSON.parse(JSON.stringify(this.topicObj));
      this.topicTitle = '修改大题'
      this.editGroupVisible = true;
    },

    saveTopic(){
      this.editGroupVisible = false;
      if(this.topicObj.id){
        updateTopicInterface(this.topicObj).then((res)=>{
          if(res.data){
            this.$message({message: "更新成功", type: 'success'});
            this.clearTopicsList();
            this.getMaterialGroup({id:this.cpsgrpId});
          }
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        addTopicInterface(this.topicObj).then((res)=>{
          if(res.data){
            this.$message({message: "新增成功", type: 'success'});
            this.clearTopicsList();
            this.getMaterialGroup({id:this.cpsgrpId});
          }
        }).catch((e)=>{
          console.log(e);
        });
      }

      this.tempTopicObj = this.topicObj;
    },

    deleteTopic(){
      let tempObj = this.topicObj;
      if(!this.topicObj.id){
        this.$alert("请先选择大题，方可删除此大题")
        return;
      }
      this.$confirm('确认删除当前大题吗？')
          .then(_ => {
            deleteTopicInterface(tempObj).then((res)=>{
              if(res.data){
                this.$message({message: "删除成功", type: 'success'});
                this.clearTopicsList();
                this.clearTopicObj();
                this.getMaterialGroup({id:this.cpsgrpId});
              }
            }).catch((e)=>{
              console.log(e);
            });
          }).catch(_ => {});
    },

    closeTopic(){
      this.topicObj = this.tempTopicObj;
      this.editGroupVisible = false;
    },

    addCpsrcdId(){
      if(!this.topicObj.id || !this.cpsgrpId){
        this.$alert("请先选择大题，方可添加子题")
        return;
      }
      this.clearCpsrcdObj();
      this.cpsrcdObj.topicId = this.topicObj.id;
      this.cpsrcdObj.cpsgrpId = this.cpsgrpId;
      this.cpsrcdTitle = "添加子题";
      this.editCpsrcdVisible = true;
    },

    updateCpsrcdId(subIndex){
      this.clearCpsrcdObj();
      this.cpsrcdObj = this.topicObj.subCpsrcds[subIndex];
      this.cpsrcdObj.topicId = this.topicObj.id;
      this.cpsrcdObj.cpsgrpId = this.cpsgrpId;
      this.cpsrcdTitle = "修改子题";
      this.editCpsrcdVisible = true;
      this.tempCpsrcdObj = JSON.parse(JSON.stringify(this.cpsrcdObj));
    },

    saveCpsrcdId(){
      this.editCpsrcdVisible = false;
      let self = this;
      if(this.cpsrcdObj.id){
        updateCpsrcdInterface(this.cpsrcdObj).then((res)=>{
          if(res.data){
            this.$message({message: "更新成功", type: 'success'});
            self.clearCpsrcdObj();
            // self.getMaterialGroup({id:self.cpsgrpId});
            // let topicId= self.topicObj.id;
            // let node = {};
            // self.formObj.topics.forEach((ele)=>{
            //   if(ele.id === topicId){
            //     node = ele;
            //   }
            // });
            // self.$refs.topicQueryTree.setCurrentKey([node.id]);
            // self.editTopic(node);
          }
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        addCpsrcdInterface(this.cpsrcdObj).then((res) => {
          if (res.data) {
            this.$message({message: "新增成功", type: 'success'});
            self.clearCpsrcdObj();
            // self.getMaterialGroup({id:self.cpsgrpId});
            // let topicId= self.topicObj.id;
            // let node = {};
            // self.formObj.topics.forEach((ele)=>{
            //   if(ele.id === topicId){
            //     node = ele;
            //   }
            // });
            // self.$refs.topicQueryTree.setCurrentKey([node.id]);
            // self.editTopic(node);
          }
        }).catch((e) => {
          console.log(e);
        });
      }
      this.tempCpsrcdObj = this.cpsrcdObj;
    },


    closeCpsrcdId(){
      this.cpsrcdObj = this.tempCpsrcdObj;
      this.editCpsrcdVisible = false;
    },

    deleteCpsrcdId(index){
      let deleteItem = this.topicObj.subCpsrcds[index];
      this.$confirm('确认删除当前子题吗？')
          .then(_ => {
            deleteCpsrcdInterface(deleteItem).then((res)=>{
              if(res.data){
                this.$message({message: "删除成功", type: 'success'});
                this.clearTopicsList();
                this.clearTopicObj();
                // this.getMaterialGroup({id:this.cpsgrpId});
              }
            }).catch((e)=>{
              console.log(e);
            });
          }).catch(_ => {});
    },

    orgNodeClick(node){
      this.editTopic(node);
    },

    filterOrg(){

    },

    beforeDialogClose(done){
      this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs['dialogForm'].resetFields();
            done();
          }).catch(_ => {});
    },

    beforeRouteEnter(to, from, next) {
      console.log(to);
    },

    beforeRouteLeave(to, from, next){
      let targetName = this.$route.path
      this.$store.commit('removeTab', targetName);
      this.$router.push({
        path: this.$store.state.maintabs.maintabs[
        this.$store.state.maintabs.maintabs.length - 1
            ].route
      })
    }

  }
}
</script>

<style scoped>
.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgb(31, 158, 254);
  color: rgb(255, 255, 255);
}
</style>