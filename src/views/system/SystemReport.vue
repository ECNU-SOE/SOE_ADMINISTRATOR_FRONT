<template>
  <div>

    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="reportQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语料组" prop="refText">
              <el-input v-model="reportQueryForm.cpsgrpName"
                        placeholder="请输入语料组"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="答题人" prop="type">
              <el-input v-model="reportQueryForm.respondentName"
                        placeholder=""/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="批阅情况" prop="tags">
              <el-radio-group v-model="reportQueryForm.reviewStatus" >
                <el-radio :label="null" size="mini">全部</el-radio>
                <el-radio :label="1" size="mini">已批阅</el-radio>
                <el-radio :label="0" size="mini">未批阅</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="7">
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
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-upload2" size="small" style="margin: 0 0 10px 20px">批量导出</el-button>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-delete" size="small" style="margin: 0 0 10px 20px">批量删除</el-button>
      <el-table :data="tableData" border class="table"  ref="multipleTable" header-cell-class-name="table-header" v-loading="loading">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="cpsgrpName" label="语料组" align="center"></el-table-column>
        <el-table-column prop="difficulty" label="难度" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="respondentName" label="答题人" align="center"></el-table-column>
        <el-table-column prop="commitTime" label="提交时间" align="center" sortable>
          <template slot-scope="scope">{{scope.row.commitTime || '无'}}</template>
        </el-table-column>
        <el-table-column prop="systemScore" label="系统评分" align="center">
          <template slot-scope="scope">{{scope.row.systemScore || '无'}}</template>
        </el-table-column>
        <el-table-column prop="manualScore" label="批阅评分" align="center">
          <template slot-scope="scope">{{scope.row.manualScore || '无'}}</template>
        </el-table-column>
        <el-table-column prop="reviewerName" label="批阅人" align="center">
          <template slot-scope="scope">{{scope.row.reviewerName || '无'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="mini" type="primary" icon="el-icon-more" circle
                       @click="getDetailInfo(scope.$index)"/>
            <el-button size="mini" type="primary" icon="el-icon-edit" circle
                       @click="handleJudge(scope.$index, scope.row)"/>
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

  </div>
</template>

<script>
import { addLanguageMaterial ,updateLanguageMaterial} from '@/api/system/sys_material'
import {saveAudio} from '@/api/system/sys_materialGroup';
import {getReportList,deleteReport} from '@/api/system/sys_report'

export default {
  name: "report",

  data(){
    return {
      reportQueryForm:{
        reviewStatus:0
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
        label: '右对齐'
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
      updateStatus:false,
      mavonObj:{
        bold: true, // 粗体
      }
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

    getDetailInfo(idx){

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

    handleClearInfo(){
      this.reportQueryForm = {};
      this.loading = true;
      getReportList(this.pagination).then((res)=>{
        this.setData(res);
      })
    },

    handlePageSizeChange(val){
      let opt = Object.assign({},this.pagination,{pageSize:val})
      this.loading = true;
      getReportList(opt).then((res)=>{
        this.setData(res);
      })
    },

    handlePageNumChange(val){
      let opt = Object.assign({},this.pagination,{pageNum:val})
      this.loading = true;
      getReportList(opt).then((res)=>{
        this.setData(res);
      })
    },
    // 查询操作
    handleSearch(){
      this.query.pageIndex = 1;
      let opt = JSON.parse(JSON.stringify(this.reportQueryForm))
      opt = Object.assign(this.pagination,opt);
      this.loading = true;
      getReportList(opt).then((res)=>{
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

    handleJudge(index, row){

    },

    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let id = this.tableData[index].transcriptId
      this.$confirm("确定要删除吗？").then(() => {
        deleteReport({id}).then((res)=>{
          if(res.code !== 0){
            this.$message({message: res.msg, type: 'error'});
          }else {
            this.loading = true;
            getReportList(this.pagination).then((resData)=>{
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
          updateLanguageMaterial({data:newForm}).then((res) => {
            if(res.code !== 0){
              this.$message({message: `修改失败,原因为${res.msg}!`, type: 'error'});
              return;
            }
            this.editVisible = false;
            this.loading = true;
            getReportList(this.pagination).then((resData)=>{
              this.setData(resData);
            })
            this.$message({message: "修改语料成功!", type: 'success'});
          }).catch((e)=>{
            this.$message({message: `修改失败，原因为${e.msg}`, type: 'error'});
          });
        }else {
          delete newForm.id;
          addLanguageMaterial({data:newForm}).then((res) => {
            if(res.code !== 0){
              this.$message({message: `添加失败,原因为${res.msg}!`, type: 'error'});
              return;
            }
            this.editVisible = false;
            this.loading = true;
            getReportList(this.pagination).then((resData)=>{
              this.setData(resData);
            })
            this.$message({message: "添加语料成功!", type: 'success'});
          }).catch((e)=>{
            this.$message({message: `添加失败，原因为${e}`, type: 'error'});
          });
        }
      }
    },

    closePreviewPage() {
      this.previewVisible = false;
      this.editVisible = true;
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
      getReportList(opt).then((res)=>{
        this.setData(res);
      })
    },

    changePreviewDemo(value,render){
      this.html = render
    }

  },

  beforeRouteEnter(to, from, next) {
    getReportList({
      pageNum: 1,
      pageSize: 20,
      total: null
    }).then(res=>{
      next(vm => {vm.setData(res)})
    })
  }
};
</script>

<style scoped>

.el-form {
  margin-top: 20px;
}
.noneAudio{
  background-color:grey
}

.el-textarea__inner { text-align: center; }
</style>
