<template>
<div>
  <el-row>
    <el-col :span="6" style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);min-height: 500px;margin-top: 1%;">
      <el-form :model="formObj">
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
          <el-form-item>
            <el-button type="primary" size="small"
                       @click="editMaterialGroup()" icon="el-icon-edit" class="updateMg">
              修改</el-button>
          </el-form-item>
          <el-descriptions title="语料组信息" :columns="3"  v-model="formObj">
            <el-descriptions-item label="语料组名称" span="3">
              <template>
                {{ formObj.title}}
                <el-popover
                    placement="right"
                    title=""
                    width="200"
                    trigger="hover"
                    :content="formObj.description">
                  <i class="el-icon-info" slot="reference"/>
                </el-popover>
              </template></el-descriptions-item>
            <el-descriptions-item label="公开情况" span="3">{{publicObj[formObj.isPrivate]}}</el-descriptions-item>
            <el-descriptions-item label="语料组难度" span="3">{{formObj.difficulty}}</el-descriptions-item>
            <el-descriptions-item label="修改状态" span="3">{{statusObj[formObj.modStatus]}}</el-descriptions-item>
            <el-descriptions-item label="创建者" span="3">{{formObj.creator}}</el-descriptions-item>
            <el-descriptions-item label="创建时间" span="3">{{this.getCurrentTime(formObj.gmtCreate)}}</el-descriptions-item>
            <el-descriptions-item label="更新时间" span="3">{{this.getCurrentTime(formObj.gmtModified)}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-form>
      <el-form ref="roleQueryForm" :model="formObj" style="margin-top: 2%;">
        <el-card>
        <el-form-item :label="'题型：(题数'+ formObj.num + '，总分'+formObj.wholeScore + ')'" >
          <el-button type="primary" size="small"
                     @click="addTopic()" icon="el-icon-circle-plus-outline" style="margin-left: 4%;position:absolute;">
            新增</el-button>
        </el-form-item>
          <el-row>
            <el-col  :span="24" style="height:300px;overflow-y: auto;">
              <div v-for="(subItem,subIndex) in formObj.topics" :key="subIndex">
                <el-button-group style="width: 100%;margin-bottom: 5px;">
                  <el-button type="primary" style="width: 65%;overflow: hidden;text-overflow: ellipsis;"  @click="chooseTopic(subIndex)">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover">
                      <el-descriptions title="语料组信息" :columns="3">
                        <el-descriptions-item label="题型名称" span="3">{{ subItem.title}}</el-descriptions-item>
                        <el-descriptions-item label="本题分值" span="3">{{subItem.score}}</el-descriptions-item>
                        <el-descriptions-item label="题型描述" span="3">{{subItem.description}}</el-descriptions-item>
                        <el-descriptions-item label="小题数量" span="3">{{getCurrentNum(subItem.subCpsrcds)}}</el-descriptions-item>
                      </el-descriptions>
                      <i class="el-icon-info" slot="reference"/>
                    </el-popover>
                    <label style="overflow: hidden;">
                      {{subIndex+1}}.{{subItem.title}}(分值:{{subItem.score}},题数:{{getCurrentNum(subItem.subCpsrcds)}})
                    </label>
                  </el-button>
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="updateTopic(subIndex)" style="height: 40px;width:17%;">
                  </el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteTopic(subIndex)" style="height: 40px;width:17%;">
                  </el-button>
                </el-button-group>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </el-col>
    <el-col :span="17" style="margin-left: 2%;margin-top: 1%;">
        <el-card style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:750px;overflow-y: auto;">
          <el-form>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addCpsrcdId()">
                新增子题
              </el-button>
            </el-form-item>
            <div>
              <div v-for="(subItem,subIndex) in topicObj.subCpsrcds" :key="subIndex">
                <el-card style="margin-top: 5px;">
                  <el-row>
                    <el-col  :span="6">
                      <el-descriptions title="子题信息" :columns="3">
                        <el-descriptions-item label="次序" span="3">{{subItem.cNum}}</el-descriptions-item>
                        <el-descriptions-item label="本题分值" span="3">{{subItem.wordWeight}}</el-descriptions-item>
                        <el-descriptions-item label="题目类型" span="3">{{subItem.type}}</el-descriptions-item>
                        <el-descriptions-item label="评测模式" span="3">{{ modeObj[subItem.evalMode]}}</el-descriptions-item>
                        <el-descriptions-item label="难度" span="3">
                          <el-rate
                              v-model="subItem.difficulty"
                              show-score
                              disabled
                              text-color="#ff9900"
                              score-template="">
                          </el-rate>
                        </el-descriptions-item>
                        <el-descriptions-item label="标签" span="3">
                          <template v-for="(tagItem,tagIndex) in subItem.tags">
                            <el-tag>{{tagItem}}</el-tag>
                          </template>
                        </el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                    <el-col :span="6">
                      <label>评测文本</label>
                      <el-button size="small" type="primary" icon="el-icon-caret-right" @click="playAudio(subIndex)" style="margin-left: 5%;">
                        播放音频
                      </el-button>
                      <el-input type="textarea" v-model="subItem.refText" :disabled="true" style="margin-top: 2%;" :rows="8"></el-input>
                    </el-col>
                    <el-col :span="6" style="margin-left: 2%;">
                      <label>文本拼音</label>
                      <el-input type="textarea" v-model="subItem.pinyin" :disabled="true" style="margin-top: 5%;" :rows="8"></el-input>
                    </el-col>
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="updateCpsrcdId(subIndex)" style="margin-left: 2%;">
                      修改
                    </el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteCpsrcdId(subIndex)">
                      删除
                    </el-button>
                  </el-row>
                </el-card>
              </div>
            </div>

          </el-form>
        </el-card>
    </el-col>
  </el-row>


  <el-dialog :title="materialGroupTitle" class="editGroups" :visible.sync="editMaterialGroupVisible" width="30%">
    <el-form label-width="120px" :rules="formObjRules" :model="tempFormObj">
      <el-form-item label="语料组标题" prop="title">
        <el-input v-model="tempFormObj.title" ></el-input>
      </el-form-item>
      <el-form-item label="语料组描述">
        <el-input v-model="tempFormObj.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="语料组难度">
        <el-select v-model="tempFormObj.difficulty1" style="width: 45%;">
          <el-option value="A">A</el-option>
          <el-option value="B">B</el-option>
          <el-option value="C" >C</el-option>
          <el-option value="D" >D</el-option>
          <el-option value="E" >E</el-option>
          <el-option value="F" >F</el-option>
          <el-option value="G" >G</el-option>
          <el-option value="H" >H</el-option>
          <el-option value="I" >I</el-option>
          <el-option value="J" >J</el-option>
        </el-select>
        <el-select v-model="tempFormObj.difficulty2" style="width: 45%;margin-left: 5%;">
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
        <el-select v-model="tempFormObj.isPrivate" >
          <el-option
              v-for="item in publicOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改状态">
        <el-select v-model="tempFormObj.modStatus" >
           <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
  <el-dialog :title="topicTitle" class="editGroups" :visible.sync="editGroupVisible" :show-close=false>
    <el-form label-width="120px" :rules="topicObjRules" :model="tempTopicObj">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="题型序号" prop="tNum">
            <el-input-number v-model="tempTopicObj.tNum"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本题分值" prop="score">
            <el-input-number v-model="tempTopicObj.score" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="题型名称" prop="title">
        <el-input v-model="tempTopicObj.title" ></el-input>
      </el-form-item>
      <el-form-item label="题型描述" prop="description">
        <el-input v-model="tempTopicObj.description" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeTopic">取 消</el-button>
                    <el-button type="primary" @click="saveTopic">确 定</el-button>
                </span>
    </template>
  </el-dialog>


  <el-dialog :title="cpsrcdTitle" class="editGroups" :visible.sync="editCpsrcdVisible" width="40%" :show-close=false>
    <el-form label-width="120px" :rules="cpsrcdObjRules" :model="tempCpsrcdObj">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="子题顺序" prop="cNum">
            <el-input-number v-model="tempCpsrcdObj.cNum"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本题分值" prop="wordWeight">
            <el-input-number v-model="tempCpsrcdObj.wordWeight"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="题目类型" prop="type">
        <el-input v-model="tempCpsrcdObj.type"></el-input>
      </el-form-item>
      <el-form-item label="评测模式" prop="evalMode">
        <el-select v-model="tempCpsrcdObj.evalMode">
          <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="本题难度" prop="difficulty">
        <el-rate
            v-model="tempCpsrcdObj.difficulty"
            show-score
            text-color="#ff9900"
            score-template="">
        </el-rate>
      </el-form-item>

      <el-form-item label="评测文本" prop="refText">
        <el-input v-model="tempCpsrcdObj.refText" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="文本拼音" prop="pinyin">
        <el-input v-model="tempCpsrcdObj.pinyin" type="textarea"></el-input>
        <el-button class="button-new-tag" size="small" @click="productPinYin" type="primary">生成</el-button>
      </el-form-item>
      <el-form-item label="示范音频" prop="audioUrl">
        <el-input v-model="tempCpsrcdObj.audioUrl" ></el-input>
        <el-upload
            class="upload-demo"
            action=""
            :on-change="audioUrlChange"
            :show-file-list="false">
          <el-button size="small" type="primary" :loading="loadingStatus">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="" prop="">
        <audio :src="tempCpsrcdObj.audioUrl" controls="controls" ref="audio"></audio>
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <el-tag
            :key="tag"
            v-for="tag in tempCpsrcdObj.tags"
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

  <el-dialog :title="cpsrcdTitle" class="editGroups" :visible.sync="editAudioVisible" width="30%" :show-close=false>
    <audio :src="currentAudioUrl" autoplay="autoplay" controls="controls" :ref="audio" id="currentAudio"></audio>
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAudio">关闭</el-button>
                </span>
    </template>
  </el-dialog>

</div>
</template>

<script>
import {pinyin} from "pinyin-pro"
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
      tempFormObj:{},
      defaultProps: {
        subCpsrcds: 'subCpsrcds',
        label: 'title'
      },
      loadingStatus:false,
      publicOptions:[
        {
          value: 1,
          label: '公开'
        }, {
          value: 0,
          label: '私有'
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
      topicObj:{
        id:"",
        cpsgrpId:this.cpsgrpId,
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      },
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
      statusObj:{0: '允许修改', 1: '允许创建者修改', 2: '不允许创建者修改'},
      statusOptions:[
      {
                value: 0,
                label: '允许修改'
              }, {
                value: 1,
                label: '允许创建者修改'
              }, {
                value: 2,
                label: '不允许创建者修改'
              }],
      currentAudioUrl:"",
      modeObj:{
        1: 'read_syllable', 2: 'read_word', 3: 'read_sentence',4:"read_chapter"
      },
      materialGroupObj: {
        1: '作业', 2: '测试', 3: '试卷'
      },
      publicObj:{1:'公开',0:'私有'},
      inputVisible: false,
      inputValue: '',
      tempTopicObj:{},
      tempCpsrcdObj:{
        cNum:0,
        wordWeight:0.5,
        tags:[]
      },
      topicTitle:'',
      cpsrcdTitle:'',
      materialGroupTitle:'修改语料组信息',
      editGroupVisible:false,
      editMaterialGroupVisible:false,
      editCpsrcdVisible:false,
      editAudioVisible:false,
      audio:null,
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
    this.getMaterialGroup({id:this.cpsgrpId,created:true});
  },
  destroyed(){
    console.log(this.$route)
  },
  methods:{

    clearTopicObj(){
      this.tempTopicObj={
        id:"",
        cpsgrpId:this.cpsgrpId,
        tNum:0,
        title:"",
        score:"",
        difficulty:0,
        description:""
      },
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
      this.tempCpsrcdObj = {
        id:"",
        cpsgrpId:"",
        topicId:"",
        cNum:"",
        evalMode:1,
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
        if(opt.created){
          self.chooseTopic(0);
        }
      }).catch((e)=>{
        console.log(e);
      });
    },

    editMaterialGroup(){
      this.tempFormObj = JSON.parse(JSON.stringify(this.formObj));
      this.editMaterialGroupVisible = true;
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

    updateTopic(idx){
      let tempObj = this.formObj.topics[idx];
      this.tempTopicObj = JSON.parse(JSON.stringify(tempObj));
      this.topicTitle = '修改大题'
      this.editGroupVisible = true;
    },

    saveTopic(){
      this.editGroupVisible = false;
      if(this.tempTopicObj.id){
        updateTopicInterface(this.tempTopicObj).then((res)=>{
          if(res.data){
            this.$message({message: "更新成功", type: 'success'});
            this.clearTopicsList();
            this.getMaterialGroup({id:this.cpsgrpId});
            this.topicObj = this.tempTopicObj;
          }
        }).catch((e)=>{
          console.log(e);
        });
      }else {
        addTopicInterface(this.tempTopicObj).then((res)=>{
          if(res.data){
            this.$message({message: "新增成功", type: 'success'});
            this.clearTopicsList();
            this.getMaterialGroup({id:this.cpsgrpId});
            this.topicObj = this.tempTopicObj;
          }
        }).catch((e)=>{
          console.log(e);
        });
      }

      this.tempTopicObj = this.topicObj;
    },

    deleteTopic(idx){
      let tempObj = this.formObj.topics[idx];
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
      this.editGroupVisible = false;
    },

    addCpsrcdId(){
      if(!this.topicObj.id || !this.cpsgrpId){
        this.$alert("请先选择大题，方可添加子题")
        return;
      }
      this.clearCpsrcdObj();
      this.tempCpsrcdObj.topicId = this.topicObj.id;
      this.tempCpsrcdObj.cpsgrpId = this.cpsgrpId;
      if(this.tempCpsrcdObj.tags === null){
        this.tempCpsrcdObj.tags = [];
      }
      this.cpsrcdTitle = "添加子题";
      this.editCpsrcdVisible = true;
    },

    updateCpsrcdId(subIndex){
      let tempObj = JSON.parse(JSON.stringify(this.topicObj.subCpsrcds[subIndex]));
      tempObj.topicId = this.topicObj.id;
      tempObj.cpsgrpId = this.cpsgrpId;
      if(tempObj.tags === null){
        tempObj.tags = [];
      }
      this.cpsrcdTitle = "修改子题";
      tempObj.pinyin = pinyin(tempObj.refText,{"toneType":"num"});
      this.tempCpsrcdObj = tempObj;
      this.editCpsrcdVisible = true;
    },

    saveCpsrcdId(){
      this.editCpsrcdVisible = false;
      let self = this;
      let tempObj = JSON.parse(JSON.stringify(this.tempCpsrcdObj));
      if(tempObj.id){
        updateCpsrcdInterface(tempObj).then((res)=>{
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
        addCpsrcdInterface(tempObj).then((res) => {
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
    },


    closeCpsrcdId(){
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
      this.tempFormObj.difficulty = this.tempFormObj.difficulty1 + this.tempFormObj.difficulty2;
      updateCurrentLanguageMaterialGroup(this.tempFormObj).then(()=>{
        this.$message({message: "保存成功", type: 'success'});
        this.getMaterialGroup({id:this.cpsgrpId});
        this.editMaterialGroupVisible = false;
      }).catch((e)=>{
        this.$message({message: `保存失败，原因为${e}`, type: 'error'});
      })
    },

    chooseTopic(idx){
      this.editTopic(this.formObj.topics[idx]);
    },

    getCurrentNum(subCpsrcds){
      if(subCpsrcds && subCpsrcds.length){
        return subCpsrcds.length;
      }else {
        return 0;
      }
    },

    audioUrlChange(file,fileList){
      this.loadingStatus = true;
      let params = new FormData();
      params.append("file",file.raw);
      saveAudio(params).then((res)=>{
        if(res.data){
          this.tempCpsrcdObj.audioUrl = res.data;
          this.loadingStatus = false;
        }
      }).catch((e)=>{
        console.log(e)
        this.loadingStatus = false;
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
      this.tempCpsrcdObj.tags.splice(this.tempCpsrcdObj.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    playAudio(idx){
      this.cpsrcdTitle = "播放音频"
      this.currentAudioUrl = this.topicObj.subCpsrcds[idx].audioUrl
      this.editAudioVisible = true;
    },

    closeAudio(){
      document.querySelector("#currentAudio").pause();
      this.editAudioVisible = false;
    },

    productPinYin(){
      let tempObj = JSON.parse(JSON.stringify(this.tempCpsrcdObj));
      tempObj.pinyin = pinyin(tempObj.refText,{"toneType":"num"});
      this.tempCpsrcdObj = JSON.parse(JSON.stringify(tempObj));
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tempCpsrcdObj.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },


  }
}
</script>

<style scoped>
.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgb(31, 158, 254);
  color: rgb(255, 255, 255);
}

.updateMg{
  position: absolute;
  margin-left: 55%;
  margin-top: 5%;
}

</style>