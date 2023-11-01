<template>
  <div>

    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="文本内容" prop="refText">
              <el-input v-model="materialQueryForm.refText"
                        placeholder="请输入文本内容"/>
            </el-form-item>
          </el-col>
            <el-col :span="6">
                <el-form-item label="语料类型" prop="type">
                    <el-select  v-model="materialQueryForm.type" placeholder="请选择" style="width:100%;">
                        <el-option
                                v-for="item in materialTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="语料标签" prop="tags">
                    <el-select v-model="materialQueryForm.tags" placeholder="请选择" style="width:100%;" multiple>
                        <el-option
                                v-for="item in tagsData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="语料难度" prop="difficulty">
                    <el-input v-model="materialQueryForm.difficulty"
                              placeholder="请输入语料难度范围,例如2-8"/>
                </el-form-item>
            </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item>
              <el-button type="primary" size="small"
                         @click="handleSearch()" icon="el-icon-search">
                查询</el-button>
                <el-button type="primary" size="small" plain
                           @click="handleClearInfo()" icon="el-icon-refresh">
                    重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加语料</el-button>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">批量导入</el-button>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-delete" size="small" style="margin: 0 0 10px 20px">批量删除</el-button>
      <el-table :data="tableData" border class="table"  ref="multipleTable" header-cell-class-name="table-header" v-loading="loading">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="difficulty" label="难度" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="refText" label="文本内容" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">
            {{ returnTagsStr(scope.row.tags)}}
          </template>
        </el-table-column>
        <el-table-column label="使用次数" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.usageCnt || 0}}
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" align="center" sortable></el-table-column>
        <el-table-column prop="gmtModified" label="更新时间" align="center" sortable></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
              <el-button size="mini" type="primary" icon="el-icon-video-play" circle
                         @click="playAudio(scope.$index)" :class="haveAudioPlayFuc(scope.row)"/>
            <el-button size="mini" type="primary" icon="el-icon-edit" circle
                       @click="handleEdit(scope.$index, scope.row)"/>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle
                       @click="handleDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="pagination.pageNum"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @size-change="handlePageSizeChange"
                @current-change="handlePageNumChange"
                background
                style="float: right;margin-bottom: 10px">
        </el-pagination>
    </el-card>


    <!-- 编辑添加语料弹出框 -->
      <el-dialog :title="dialogTitle" class="editGroups" :visible.sync="editVisible" width="40%" :show-close=false>
          <el-form label-width="120px" :rules="cpsrcdObjRules" :model="form">
              <el-row :gutter="20">
                  <el-col :span="11">
                      <el-form-item label="题目类型" prop="type">
                          <el-select v-model="form.type" @change="chooseEvalMode">
                              <el-option
                                      v-for="item in materialTypeList"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="11">
                      <el-form-item label="评测模式">
                          <el-select v-model="form.evalMode">
                              <el-option
                                      v-for="item in modeOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-form-item label="题目难度">
                <el-slider
                    v-model="form.difficulty"
                    :max="12"
                    show-stops>
                </el-slider>
              </el-form-item>
            <el-form-item label="对齐方式" prop="text_align">
              <el-select v-model="form.text_align">
                <el-option
                    v-for="item in alignTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="评测文本" prop="refText">
                  <el-input v-model="form.refText" type="textarea" autosize :disabled="updateStatus"></el-input>
              </el-form-item>
              <el-form-item label="文本拼音" prop="pinyin">
                  <el-input v-model="form.pinyin" type="textarea" autosize :disabled="updateStatus"></el-input>
                  <el-button class="button-new-tag" size="small" @click="productPinYin" type="primary">生成</el-button>
              </el-form-item>
              <el-form-item label="示范音频" prop="audioUrl">
                  <el-upload
                          class="upload-demo"
                          action=""
                          :on-change="audioUrlChange"
                          :show-file-list="false">
                      <el-row :gutter="54">
                        <el-col :span="15"><el-input v-model="form.audioUrl" ></el-input></el-col>
                        <el-col :span="3"><el-button size="small" type="primary" :loading="loadingStatus">上传</el-button></el-col>
                        <el-col :span="3"><el-button size="small" type="primary">录音</el-button></el-col>
                        <el-col :span="3"><el-button size="small" type="primary" @click="playAudio($event)">播放</el-button></el-col>
                      </el-row>
                  </el-upload>

              </el-form-item>
              <el-form-item label="标签">
                  <el-tag
                          :key="tag.id"
                          v-for="tag in form.tags"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(tag)">
                      {{tag.name}}
                  </el-tag>
                  <el-select
                          class="input-new-tag"
                          v-if="inputVisible"
                          ref="saveTagInput"
                          v-model="inputValue"
                          size="small"
                          filterable
                          @visible-change="handleInputConfirm" multiple>
                      <el-option
                              v-for="item in tempTagsData"
                              :key="item.id"
                              :label="item.name"
                              :disabled="item.disabled"
                              :value="item.id">
                      </el-option>
                  </el-select>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form-item>
          </el-form>
          <template #footer>
                <span class="dialog-footer">
                  <el-button v-if="dialogTitle === '修改语料'" @click="previewCurrentTitle" class="previewTitle">预览</el-button>
                  <el-button @click="editVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit">确 定</el-button>
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

    <el-dialog title="预览题目" :visible.sync="previewVisible" width="30%" :show-close=false>
      <div class="previewTitle">
        <div><label>标签:</label><label style="margin-left: 0.1rem;">{{returnTagsStr(form.tags)}}</label></div>
        <el-row>
          <el-col :span="16">
            <label>示范语音</label>
            <audio :src="currentAudioUrl" autoplay="autoplay" controls="controls" :ref="audio" style="display: none" class="audioDemo"></audio>
            <el-button type="text" icon="el-icon-video-play"
                       @click="playDemo()" class="playAudio"></el-button>
            <el-button type="text" icon="el-icon-video-pause"
                       @click="pauseDemo()" class="playAudio"></el-button>
            <el-button type="text" icon="el-icon-refresh"
                       @click="loadDemo()" class="playAudio"></el-button>
          </el-col>
          <el-col :span="6">
            <label>展示拼音:</label>
            <el-switch
                v-model="showPinyin"
                style="scale:1.3;margin-left:0.05rem;"
                active-color="#13ce66"
                inactive-color="#ff4949" @change="showPinyinFuc">
            </el-switch>
          </el-col>
        </el-row>
        <div>{{form.type}}</div>
        <el-input v-model="previewDemo" type="textarea" :autosize="returnAutoObj"></el-input>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="closePreviewPage">关闭</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
    import {pinyin} from "pinyin-pro";
    import { getTagsList} from '@/api/system/sys_tag'
    import { getLanguageMaterial,addLanguageMaterial ,updateLanguageMaterial,deleteLanguageMaterial} from '@/api/system/sys_material'
    import {getJwtToken} from "@/lib/utils";
    import {saveAudio} from '@/api/system/sys_materialGroup';
    import axios from 'axios';
    export default {
        name: "material",

        data(){
            return {
              materialQueryForm:{
              },
              currentAudioUrl:'',
              cpsrcdObjRules:{},
              tableData:[],
              tagsData:[],
              tempTagsData:[],
              dialogTitle:'',
              form:{
                id:"",
                type: "",
                pinyin:"",
                refText:"",
                tags:[],
                audioUrl:'',
                difficulty:-1,
                evalMode:null
              },
              pagination:{
                pageNum: 1,
                pageSize: 20,
                total: null
              },
              pageTotal:0,
              editVisible:false,
              inputVisible:false,
              editAudioVisible:false,
              previewVisible:false,
              audio:null,
              query:{
                cur: 1,
                size: 20,
              },
              stateArr:[],
              pageIndex:0,
              cpsrcdTitle:'',
              set:{
                0:"单字",
                1:"词语",
                2:"句子",
                3:"段落",
                5:"古诗"
              },
              alignTypeList:[{
                value:  -1,
                label: '左对齐'
              },{
                value: 0,
                label: '居中对齐'
              },{
                value: 1,
                label: '左对齐'
              },{
                value: 2,
                label: '两端对齐'
              }],
              materialTypeList:[
                {
                  value: '朗读字词',
                  label: '朗读字词'
                },{
                  value: '朗读句子',
                  label: '朗读句子'
                },{
                  value: '朗读诗词',
                  label: '朗读诗词'
                },{
                  value: '朗读文章',
                  label: '朗读文章'
                },{
                  value: '单选题',
                  label: '单选题'
                },{
                  value: '多选题',
                  label: '多选题'
                },{
                  value: '写汉字',
                  label: '写汉字'
                },{
                  value: '看视频答题',
                  label: '看视频答题'
                },{
                  value: '其他类型',
                  label: '其他类型'
                }],
              modeOptions:[ {
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
              },{
                value: 5,
                label: 'answer_based'
              },{
                value: 6,
                label: 'open_ended'
              }  ],
              loadingStatus:false,
              inputValue:'',
              contentStyle:{
                "text-align":"center;"
              },
              labelStyle:{
                "text-align":"center;",
                "margin-left":"5px"
              },
              showPinyin:true,
              returnAutoObj:{
                minRows: 6,
                maxRows: 10
              },
              previewDemo:"",
              sortType:'时间顺序',
              loading:false,
              updateStatus:false
            }
        },


        methods:{

          haveAudioPlayFuc(e){
            if(e.audioUrl){
              return '';
            }else{
              return 'noneAudio';
            }
            console.log(e)
          },

          chooseEvalMode(e){
            switch(e){
              case '朗读字词':
                this.form.evalMode = 2;
                break;
              case '朗读句子':
              case '朗读诗词':
                this.form.evalMode = 3;
                break;
              case '朗读文章':
                this.form.evalMode = 4;
                break;
              case '单选题[非拼音版]':
              case '多选题':
              case '写汉字':
                this.form.evalMode = 5;
                break;
              case '看视频答题':
              case '其他类型':
                this.form.evalMode = 6;
                break;
                break;
              default:
                this.form.evalMode = 0;
            }

          },

            showInput() {
                getTagsList({}).then((res)=>{
                    let records = res.data.records;
                    let chooseTags = this.form.tags || [];
                    let count = 0;
                    records.forEach(function (it,idx){
                        for(let i = 0;i < chooseTags.length;i++){
                            if(it.name === chooseTags[i].name){
                                count++;
                                records[idx].disabled = true;
                            }
                        }
                    })
                    this.tempTagsData = records;
                    if(count === records.length){
                        this.$message({message: `已添加所有标签，无法再次添加`, type: 'error'});
                        this.inputVisible = false;
                    }else {
                        this.inputVisible = true;
                    }
                }).catch((e)=>{
                    this.$message({message: `获取标签失败，原因为${e.msg}`, type: 'error'});
                });
            },

            handleClose(tag) {
                this.form.tags.splice(this.tempTagsData.indexOf(tag), 1);
            },

            closeAudio(){
                document.querySelector("#currentAudio").pause();
                this.editAudioVisible = false;
            },

            handleInputConfirm(flag) {
                if(!flag){
                    let tempObj = {};
                    let form = JSON.parse(JSON.stringify(this.form || {}));
                    if(!form.tags){
                        form.tags = []
                    }
                    let selectItem = this.inputValue;
                    this.tempTagsData.forEach(function (it){
                        if(Array.isArray(selectItem)){
                            selectItem.forEach(function (select){
                                if(it.id === select){
                                    form.tags.push(it);
                                }
                            })
                        }else{
                            if(it.id === selectItem){
                               form.tags.push(it);
                            }
                        }
                    })
                    this.form = form;
                    this.inputVisible = false;
                    this.inputValue = '';
                }
            },

            playAudio(idx){
                this.cpsrcdTitle = "播放音频"
                this.currentAudioUrl = '';
                if(typeof idx === 'number'){
                  this.currentAudioUrl = this.tableData[idx].audioUrl || ''
                }else{
                  idx.stopPropagation();
                  this.currentAudioUrl = this.form.audioUrl || ''
                }
                if(!this.currentAudioUrl){
                  this.$message({message: "当前题目无可播放音频，请上传后再试！", type: 'warning'});
                }else{
                  if(document.querySelector("#currentAudio")){
                    document.querySelector("#currentAudio").load();
                  }
                  this.editAudioVisible = true;
                }
            },

            audioUrlChange(file,fileList){
                this.loadingStatus = true;
                let params = new FormData();
                params.append("file",file.raw);
                saveAudio(params).then((res)=>{
                    if(res.data){
                        this.form.audioUrl = res.data;
                        this.loadingStatus = false;
                    }
                }).catch((e)=>{
                    console.log(e)
                    this.loadingStatus = false;
                })
                console.log(file);
            },

            productPinYin(){
                let tempObj = JSON.parse(JSON.stringify(this.form));
                tempObj.pinyin = pinyin(tempObj.refText,{"toneType":"num"});
                this.form = JSON.parse(JSON.stringify(tempObj));
            },

            returnTagsStr(list){
                let returnStr = [];
                if(list && list.length){
                    list.forEach((ele)=>{
                        returnStr.push(ele.name);
                    });
                }
                return returnStr.join(',');
            },
          handleClearInfo(){
            this.materialQueryForm = {};
            this.loading = true;
            getLanguageMaterial(this.pagination).then((res)=>{
              this.setData(res);
            })
          },

          handlePageSizeChange(val){
            let opt = Object.assign({},this.pagination,{pageSize:val})
            this.loading = true;
            getLanguageMaterial(opt).then((res)=>{
              this.setData(res);
            })
          },

          handlePageNumChange(val){
            let opt = Object.assign({},this.pagination,{pageNum:val})
            this.loading = true;
            getLanguageMaterial(opt).then((res)=>{
              this.setData(res);
            })
          },
            // 查询操作
            handleSearch(){
                this.query.pageIndex = 1;
                let opt = JSON.parse(JSON.stringify(this.materialQueryForm))
                opt.tagIds = opt.tags;
                if(opt.difficulty){
                    let list = opt.difficulty.split('-');
                    if(list.length === 2){
                        opt.difficultyBegin = list[0];
                        opt.difficultyEnd = list[1];
                    }else if(list.length === 1){
                        opt.difficultyBegin = list[0];
                    }else{
                        this.$message({message: "请输入合理范围的难度.", type: 'warning'});
                    }
                }
                opt = Object.assign(opt,this.pagination);
              this.loading = true;
                getLanguageMaterial(opt).then((res)=>{
                    this.setData(res);
                })
            },

            setData(data){
                this.loading = false;
                if(data){
                    this.tableData = data.data.records;
                    this.pagination.pageSize = data.data.size
                    this.pagination.total = data.data.total
                }
            },

            setTagsData(data){
                if(data){
                    this.tagsData = data.data.records;
                    this.tempTagsData = JSON.parse(JSON.stringify(this.tagsData))
                }
            },

            saveEdit(){
                if(!this.form.refText){
                    this.$message({message: "语料文本内容不能为空.", type: 'warning'});
                    return false;
                }
                this.submitForm();
            },

            clear(newForm){
                const keys = Object.keys(newForm);
                let obj  = {
                    id:"",
                    type: "",
                    pinyin:"",
                    refText:"",
                    tags:[],
                    audioUrl:'',
                    difficulty:-1,
                    evalMode:null
                };
                Object.assign(newForm, obj);
            },

            handleEdit(index, row){
                this.updateStatus = false;
                this.editVisible = true;
                this.dialogTitle = "修改语料"
                Object.keys(this.form).forEach((item) => {
                    this.form[item] = row[item];
                });
                this.form.difficulty = parseFloat(this.form.difficulty);
            },

            // 删除操作
            handleDelete(index){
                // 二次确认删除
                let id = this.tableData[index].id
                this.$confirm("确定要删除吗？").then(() => {
                    deleteLanguageMaterial({id}).then((res)=>{
                      if(res.code !== 0){
                        this.$message({message: res.msg, type: 'error'});
                      }else {
                        this.loading = true;
                        getLanguageMaterial(this.pagination).then((resData)=>{
                          this.setData(resData);
                        })
                        this.$message({message: "删除成功", type: 'success'});
                      }
                    }).catch((e)=>{
                        this.$message({message: `删除失败，原因为${e.msg}`, type: 'error'});
                    })
                }).catch(() => {});
            },

            handleAdd(){
              this.updateStatus = false;
              this.dialogTitle = '新增语料';
              this.clear(this.form);
              this.editVisible = true;
            },


            submitForm(){
                if(this.form){
                    let newForm = JSON.parse(JSON.stringify(this.form));
                    if(newForm.tags && newForm.tags.length){
                        newForm.tagIds = [];
                        newForm.tags.forEach(it=>{
                            newForm.tagIds.push(it.id);
                        })
                    }else{
                        newForm.tagIds = []
                    }
                    newForm.difficulty = parseFloat(newForm.difficulty);
                    delete newForm.tags;
                    if(newForm.id){
                        if(newForm.userBy && parseInt(newForm.userBy) > 0){
                            this.$confirm(`当前有${parseInt(newForm.userBy)}个语料组使用该语料。确定要修改当前语料信息吗？`).then(() => {
                                updateLanguageMaterial({data:newForm}).then((res) => {
                                    if(res.code !== 0){
                                        this.$message({message: res.msg, type: 'error'});
                                        return;
                                    }
                                    this.editVisible = false;
                                    this.loading = true;
                                    getLanguageMaterial(this.pagination).then((resData)=>{
                                        this.setData(resData);
                                    })
                                    this.$message({message: "修改语料成功!", type: 'success'});
                                }).catch((e)=>{
                                    this.$message({message: `修改失败，原因为${e.msg}`, type: 'error'});
                                });
                            }).catch(() => {});
                        }else{
                            updateLanguageMaterial({data:newForm}).then((res) => {
                                if(res.code !== 0){
                                    this.$message({message: res.msg, type: 'error'});
                                    return;
                                }
                                this.editVisible = false;
                              this.loading = true;
                                getLanguageMaterial(this.pagination).then((resData)=>{
                                    this.setData(resData);
                                })
                                this.$message({message: "修改语料成功!", type: 'success'});
                            }).catch((e)=>{
                                this.$message({message: `修改失败，原因为${e.msg}`, type: 'error'});
                            });
                        }
                    }else {
                        delete newForm.id;
                        addLanguageMaterial({data:newForm}).then((res) => {
                            if(res.code !== 0){
                                this.$message({message: "添加失败!", type: 'error'});
                                return;
                            }
                            this.editVisible = false;
                          this.loading = true;
                            getLanguageMaterial(this.pagination).then((resData)=>{
                                this.setData(resData);
                            })
                            this.$message({message: "添加语料成功!", type: 'success'});
                        }).catch((e)=>{
                            this.$message({message: `添加失败，原因为${e}`, type: 'error'});
                        });
                    }
                }
            },

          previewCurrentTitle(){
            if(this.form && this.form.id){
              this.previewDemo = this.form.pinyin ? this.form.pinyin + "\n" + this.form.refText : this.form.refText;
              this.previewVisible = true;
              this.editVisible = false;
            }else{
              this.$message({message: "当前题目并未正确录入，请录入后重试!", type: 'warning'});
            }
          },

          closePreviewPage() {
            this.previewVisible = false;
            this.editVisible = true;
          },

          playDemo(){
            this.currentAudioUrl = this.form.audioUrl || '';
            if(!this.currentAudioUrl){
              this.$message({message: "当前题目无可播放音频，请上传后再试！", type: 'warning'});
            }
            document.querySelector(".audioDemo").play();
          },

          pauseDemo(){
            this.currentAudioUrl = this.form.audioUrl || '';
            if(!this.currentAudioUrl){
              this.$message({message: "当前题目无可播放音频，请上传后再试！", type: 'warning'});
            }
            document.querySelector(".audioDemo").pause();
          },

          loadDemo(){
            this.currentAudioUrl = this.form.audioUrl || '';
            if(!this.currentAudioUrl){
              this.$message({message: "当前题目无可播放音频，请上传后再试！", type: 'warning'});
            }
            document.querySelector(".audioDemo").load();
          },

          showPinyinFuc(flag){
            if(flag && this.form.pinyin){
              this.previewDemo = this.form.pinyin + "\n" + this.form.refText;
            }else {
              this.previewDemo = this.form.refText;
            }
          },

          handleMaterialSort(idx){
            let sortObj = ['时间倒序','时间顺序'];
            this.sortType = sortObj[parseInt(idx)];
            let obj = {};
            if(parseInt(idx) === 0 || parseInt(idx) === 1){
              obj = {sortByTime:parseInt(idx)}
            }
            let opt = Object.assign({},this.pagination,obj)
            this.loading = true;
            getLanguageMaterial(opt).then((res)=>{
              this.setData(res);
            })
          },

        },

        beforeRouteEnter(to, from, next) {
            axios.all([
                getLanguageMaterial({
                    pageNum: 1,
                    pageSize: 20,
                    total: null
                }),
                getTagsList({})])
                .then(axios.spread(function (res1, res2) {
                // 两个请求都执行完成后，进入该函数
                next(vm => {vm.setData(res1);vm.setTagsData(res2)})
            }));
        }
    };
</script>

<style scoped>
    .playAudio{
      scale: 2;
      margin-left: 0.1rem;
    }
    .el-form {
      margin-top: 20px;
    }
    .noneAudio{
      background-color:grey
    }

    .el-textarea__inner { text-align: center; }
</style>
