<template>
<div>

      <el-form :model="formObj">
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
          <el-row :gutter="120">
          <el-col :span="5">
            <el-form-item label="语料组标识" prop="cpsgrpId">
              <el-input v-model="cpsgrpId"
                        placeholder="请输入语料组标识" :disabled="true" style="position: absolute;margin-left: 10px;"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="语料组名称">
              <el-input v-model="formObj.title" :disabled="true" style="position: absolute;margin-left: 10px;"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="5">
              <el-form-item label="开始时间">
                <el-input v-model="formObj.startTime" :disabled="true" style="position: absolute;margin-left: 10px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公开情况">
                <el-select v-model="formObj.isPrivate" :disabled="true">
                  <el-option
                      v-for="item in publicOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="120">

            <el-col :span="5">
              <el-form-item label="语料组描述">
                <el-input v-model="formObj.description" :disabled="true" style="position: absolute;margin-left: 10px;"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="5">
            <el-form-item label="结束时间">
              <el-input v-model="formObj.endTime" :disabled="true" style="position: absolute;margin-left: 10px;"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="5">
              <el-form-item label="语料组难度">
                <el-input v-model="formObj.difficulty" :disabled="true" style="position: absolute;margin-left: 10px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="语料组类型">
                <el-select v-model="formObj.type" placeholder="请选择" :disabled="true">
                  <el-option
                      v-for="item in materialGroupOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small"
                           @click="editMaterialGroupVisible=true" icon="el-icon-circle-plus-outline">
                  修改</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
  <el-row>
    <el-col :span="4" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);min-height: 500px;margin-top: 1%;">
      <el-form ref="roleQueryForm" :model="formObj">
        <el-form-item :label="'题数'+ formObj.num + '，总分'+formObj.wholeScore" style="margin-left: 20px;">
          <el-button type="primary" size="small"
                     @click="addTopic()" icon="el-icon-circle-plus-outline" style="margin-left: 20px;">
            新增</el-button>
        </el-form-item>
      </el-form>
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
    <el-col :span="19" style="margin-left: 2%;margin-top: 1%;">
        <el-card>
          <el-form>
            <el-form-item label="大题信息" prop="cpsgrpId" style="margin-left: 40%">
            </el-form-item>
            <el-row :gutter="120">
            <el-col :span="7">
              <el-form-item label="次序" prop="tNum">
                <el-input-number v-model="topicObj.tNum" :disabled="true"></el-input-number>
              </el-form-item>
            </el-col>
              <el-col :span="7">
                <el-form-item label="大题名称" prop="title">
                  <el-input v-model="topicObj.title"  :disabled="true" style="position: absolute;"></el-input>
                </el-form-item>
              </el-col>
            <el-col :span="7" style="margin-left: 5%;">
              <el-button size="small" type="primary" icon="el-icon-edit" @click="updateTopic()" >
                修改
              </el-button>
              <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteTopic()">
                删除
              </el-button>
            </el-col>
            </el-row>
            <el-row :gutter="120">
              <el-col :span="7">
                <el-form-item label="难度" prop="difficulty" >
                  <el-input-number v-model="topicObj.difficulty" :disabled="true"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="大题分值" prop="score">
                  <el-input v-model="topicObj.score"  :disabled="true"  style="position: absolute;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="说明" prop="description">
                  <el-input v-model="topicObj.description"  :disabled="true"  style="position: absolute;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
                <el-row :gutter="120">
                <el-col :span="5">
                <el-form-item label="次序" prop="cNum">
                  <el-input-number v-model="subItem.cNum" :disabled="true" style="position: absolute;"></el-input-number>
                </el-form-item>
                </el-col>
                  <el-col :span="5">
                    <el-form-item label="评测模式" prop="evalMode">
                      <el-input-number v-model="subItem.evalMode" :disabled="true" style="position: absolute;"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="说明" prop="pinyin">
                      <el-input v-model="subItem.pinyin" :disabled="true" style="position: absolute;"></el-input>
                    </el-form-item>
                  </el-col>
                <el-col :span="5" style="margin-left: 3%;">
                  <el-button size="small" type="primary" icon="el-icon-edit" @click="updateCpsrcdId(subIndex)">
                    修改
                  </el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteCpsrcdId(subIndex)">
                    删除
                  </el-button>
                </el-col>
                </el-row>
                <el-row :gutter="120">
                  <el-col :span="5">
                    <el-form-item label="难度" prop="difficulty">
                      <el-input-number v-model="subItem.difficulty" :disabled="true" style="position: absolute;"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="每字分数" prop="wordWeight">
                      <el-input-number v-model="subItem.wordWeight" :disabled="true" style="position: absolute;"></el-input-number>
                    </el-form-item>
                  </el-col>
<!--                  <el-col :span="5">-->
<!--                    <el-form-item label="标签" prop="tags">-->
<!--                      <el-input v-model="subItem.tags" :disabled="true" style="position: absolute;"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
                  <el-col :span="7">
                    <el-form-item label="示范音频" prop="audioUrl">
                      <el-input v-model="subItem.audioUrl" :disabled="true" style="position: absolute;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="评测文本" prop="refText">
                      <el-input v-model="subItem.refText" :disabled="true" style="position: absolute;" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-form>
        </el-card>
    </el-col>
  </el-row>


  <el-dialog :title="materialGroupTitle" class="editGroups" :visible.sync="editMaterialGroupVisible" width="30%">
    <el-form label-width="120px" :rules="formObjRules" :model="formObj">
      <el-form-item label="语料组标题" prop="title">
        <el-input v-model="formObj.title" ></el-input>
      </el-form-item>
      <el-form-item label="语料组类型">
        <el-select v-model="formObj.type" placeholder="请选择" style="width:100%;">
          <el-option
              v-for="item in materialGroupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语料组描述">
        <el-input v-model="formObj.description" ></el-input>
      </el-form-item>
      <el-form-item label="语料组难度">
        <el-input-number v-model="formObj.difficulty"></el-input-number>
      </el-form-item>
      <el-form-item label="语料组难度">
        <el-select v-model="formObj.difficulty1" style="width: 45%;">
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
        <el-select v-model="formObj.difficulty2" style="width: 45%;margin-left: 5%;">
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
        <el-select v-model="formObj.isPrivate" >
          <el-option
              v-for="item in publicOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改状态">
        <el-select v-model="formObj.modStatus" >
          <el-option key=0 label="允许修改" value=0></el-option>
          <el-option key=1 label="允许创建者修改" value=1></el-option>
          <el-option key=2 label="不允许创建者修改" value=2></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
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
                    <el-button @click="editMaterialGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveMaterialGroup">确 定</el-button>
                </span>
    </template>
  </el-dialog>

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
        <el-select v-model="cpsrcdObj.evalMode">
          <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-rate
            v-model="cpsrcdObj.difficulty"
            show-score
            text-color="#ff9900"
            score-template="">
        </el-rate>
      </el-form-item>
      <el-form-item label="每字分值" prop="wordWeight">
        <el-input-number v-model="cpsrcdObj.wordWeight"></el-input-number>
      </el-form-item>
<!--      <el-form-item label="说明" prop="pinyin">-->
<!--        <el-input v-model="cpsrcdObj.pinyin" ></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="评测文本" prop="refText">
        <el-input v-model="cpsrcdObj.refText" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="示范音频" prop="audioUrl">
        <el-input v-model="cpsrcdObj.audioUrl" ></el-input>
        <el-upload
            class="upload-demo"
            action=""
            :on-change="audioUrlChange">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="" prop="">
        <audio :src="cpsrcdObj.audioUrl" autoplay="autoplay" controls="controls" ref="audio"></audio>
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <el-tag
            :key="tag"
            v-for="tag in cpsrcdObj.tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
  updateCpsrcdInterface,deleteCpsrcdInterface,addCpsrcdInterface,getTopicInterface,updateCurrentLanguageMaterialGroup,saveAudio} from '@/api/system/sys_materialGroup';
import {getCurrentTimeStr} from "@/lib/utils";
export default {
  name: "SystemMaterialGroupDetail.vue",
  data() {
    return {
      cpsgrpId:sessionStorage.getItem("cpsrcdId"),
      formObj:{
        cpsgrpId:sessionStorage.getItem("cpsrcdId"),
        title:'',
        description:'',
        type:'',
        difficulty:'',
        difficulty1:0,
        difficulty2:0,
        modStatus:-1,
        isPrivate:'',
        startTime:'',
        endTime:'',
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
        tags:[]
      },
      publicOptions:[
        {
          value: 1,
          label: '公开'
        }, {
          value: 0,
          label: '私有'
        }
      ],
      modeOptions:[
        {
          value: 1,
          label: 'read_syllable'
        }, {
          value: 2,
          label: 'read_word'
        }, {
          value: 3,
          label: 'read_sentence'
        }, {
          value: 4,
          label: 'read_chapter'
        }
      ],
      materialGroupOptions:[ {
        value: 1,
        label: '作业'
      }, {
        value: 2,
        label: '测试'
      }, {
        value: 3,
        label: '试卷'
      }],
      inputVisible: false,
      inputValue: '',
      tempTopicObj:{},
      tempCpsrcdObj:{},
      topicTitle:'',
      cpsrcdTitle:'',
      materialGroupTitle:'修改语料组信息',
      editGroupVisible:false,
      editMaterialGroupVisible:false,
      editCpsrcdVisible:false,
      formObjRules:{
        title:[ {required: true, message: '请输入语料组标题',trigger:'blur'}]
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
      },
      cpsrcdObjRules:{
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
  destroyed(){
    console.log(this.$route)
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
        tags:[]
      }
    },

    getMaterialGroup(opt){
      let self= this;
      getCurrentLanguageMaterialGroup(opt).then((res)=>{
        self.formObj = res.data;
        self.formObj.num = res.data.topics && res.data.topics.length || 0;
        if(self.formObj.endTime){
          self.formObj.endTime = self.getCurrentTime(self.formObj.endTime);
        }
        if(self.formObj.startTime){
          self.formObj.startTime = self.getCurrentTime(self.formObj.startTime);
        }
        if(self.formObj.gmtCreate){
          self.formObj.gmtCreate = self.getCurrentTime(self.formObj.gmtCreate);
        }
        if(self.formObj.gmtModified){
          self.formObj.gmtModified = self.getCurrentTime(self.formObj.gmtModified);
        }
        if(self.formObj.difficulty){
          self.formObj.difficulty1 = self.formObj.difficulty.charAt(0);
          self.formObj.difficulty2 = self.formObj.difficulty.charAt(1);
        }

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
      getTopicInterface({id:tempObj.id}).then((res)=>{
        tempObj = res.data
        this.topicObj = tempObj;
      })
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
      if(this.cpsrcdObj.tags === null){
        this.cpsrcdObj.tags = [];
      }
      this.cpsrcdTitle = "添加子题";
      this.editCpsrcdVisible = true;
    },

    updateCpsrcdId(subIndex){
      this.clearCpsrcdObj();
      this.cpsrcdObj = this.topicObj.subCpsrcds[subIndex];
      this.cpsrcdObj.topicId = this.topicObj.id;
      this.cpsrcdObj.cpsgrpId = this.cpsgrpId;
      if(this.cpsrcdObj.tags === null){
        this.cpsrcdObj.tags = [];
      }
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
            getTopicInterface({id:self.topicObj.id}).then((res)=>{
              this.topicObj = res.data;
            });
          }
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        addCpsrcdInterface(this.cpsrcdObj).then((res) => {
          if (res.data) {
            this.$message({message: "新增成功", type: 'success'});
            self.clearCpsrcdObj();
            getTopicInterface({id:self.topicObj.id}).then((res)=>{
              this.topicObj = res.data;
            });
          }
        }).catch((e) => {
          console.log(e);
        });
      }
      this.tempCpsrcdObj = this.cpsrcdObj;
    },


    closeCpsrcdId(){
      this.clearCpsrcdObj();
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
                getTopicInterface({id:this.topicObj.id}).then((res)=>{
                  this.topicObj = res.data;
                });
                // this.getMaterialGroup({id:this.cpsgrpId});
              }
            }).catch((e)=>{
              console.log(e);
            });
          }).catch(_ => {});
    },

    saveMaterialGroup(){
      this.formObj.difficulty = this.formObj.difficulty1 + this.formObj.difficulty2;
      updateCurrentLanguageMaterialGroup(this.formObj).then(()=>{
        this.$message({message: "保存成功", type: 'success'});
        this.getMaterialGroup({id:this.cpsgrpId});
        this.editMaterialGroupVisible = false;
      }).catch((e)=>{
        this.$message({message: `保存失败，原因为${e}`, type: 'error'});
      })
    },

    orgNodeClick(node){
      this.editTopic(node);
    },

    filterOrg(){

    },

    audioUrlChange(file,fileList){
      let params = new FormData();
      params.append("file",file.raw);
      saveAudio(params).then((res)=>{
        if(res.data){
          this.cpsrcdObj.audioUrl = res.data
        }
      }).catch((e)=>{
        console.log(e)
      })
      console.log(file);
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time);
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

    handleClose(tag) {
      this.cpsrcdObj.tags.splice(this.cpsrcdObj.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.cpsrcdObj.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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