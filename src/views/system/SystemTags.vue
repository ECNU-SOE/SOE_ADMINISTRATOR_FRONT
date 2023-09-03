<template>
  <div>
    <el-card body-style="padding: 0">
      <el-form ref="userQueryForm" :model="materialQueryForm" label-width="80px">
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="标签标识" prop="id">
              <el-input v-model="materialQueryForm.id" placeholder="请输入标签标识"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="标签名称" prop="name">
              <el-input v-model="materialQueryForm.name" placeholder="请输入标签名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="标签权重" prop="weight">
              <el-input v-model="materialQueryForm.weight" placeholder="请输入标签权重"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="标签类别" prop="category">
              <el-input v-model="materialQueryForm.category" placeholder="请输入标签类别"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" padding="0 20px">
            <el-button type="primary" size="small"
                       @click="handleSearch()" icon="el-icon-search">
              查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加标签</el-button>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" >
        <el-table-column prop="id" label="标签标识" align="center" width="100" />
        <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="weight" label="标签权重" align="center"/>
        <el-table-column prop="category" label="标签类别" align="center">
<!--          <template slot-scope="scope">-->
<!--            {{ modObj[scope.row.modStatus]}}-->
<!--          </template>-->
        </el-table-column>
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
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="selections.name"></el-input>
        </el-form-item>
        <el-form-item label="标签权重">
          <el-input v-model="selections.weight"></el-input>
        </el-form-item>
        <el-form-item label="标签种类">
          <el-input v-model="selections.category"></el-input>
<!--          <el-select v-model="selections.category" style="width: 45%;">-->
<!--            <el-option label="A" value=0>A</el-option>-->
<!--            <el-option label="B" value=1>B</el-option>-->
<!--            <el-option label="C" value=2>C</el-option>-->
<!--            <el-option label="D" value=3>D</el-option>-->
<!--          </el-select>-->
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import { getTagsList,updateTags,addTags,deleteTags} from '@/api/system/sys_tag'
import {getJwtToken,getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "tags",

  data(){
    return {
      tableData:[],
      dialogTitle:'',
      dialogMaterialTitle:'',
      dialogTopicTitle:"",
      selectionsObj:{
        id:null,
        name:"",
        weight:null,
        category:null
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
      classInfoList:[],
      materialQueryForm:{
        id: null,
        name:"",
        weight:null,
        category:null
      },
      // 表格编辑时弹窗和保存
      editGroupVisible:false,
      editMaterialVisible:false,
      editTopicVisible:false,
      showClassVisible:false,
      contentStyle:{
        "text-align":"center;"
      },
      labelStyle:{
        "text-align":"center;",
        "margin-left":"5px"
      },
      token:getJwtToken(),
      selectionsRules:{
        name: [
          {required: true, message: '请选择标签名称',trigger:'blur'}
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
      getTagsList(opt).then((res) => {
        let records = res.data.records;
        this.tableData = records;
        let total = res.data.length;
        this.pageTotal = total || 50;
      }).catch((e)=>{
        this.tableData = [];
        this.pageTotal = 0;
      });
    },
    // 查询操作
    handleSearch(){
      let tagInfo = this.materialQueryForm && JSON.parse(JSON.stringify(this.materialQueryForm)) || {};
      if(tagInfo.id || tagInfo.category || tagInfo.name || tagInfo.weight){
        if(tagInfo.id){
          let list = tagInfo.id.split(',');
          tagInfo.ids = list.map(it=>parseInt(it));
        }
        getTagsList(tagInfo).then((res)=>{
          let records = res.data.records;
          this.tableData = records;
          let total = res.data.total;
          this.pageTotal = total || 50;
        }).catch((e)=>{
          this.tableData = [];
          console.log(e)
        })
      }else {
        this.getData(tagInfo);
      }

    },

    saveEdit(){
      let opt = this.selectionsObj || {};
      if(this.selectionsObj.id){
        updateTags(opt).then((e)=>{
          if(e.data){
            this.$message({message: "更新成功", type: 'success'});
          }
        }).catch((e)=>{
          this.$message({message: e.msg, type: 'error'});
        });
      }else {
        addTags(opt).then((e)=>{
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
        ids:null,
        name:"",
        weight:null,
        category:null
      }
    },

    handleAdd(){
      this.dialogTitle = '新增标签';
      this.clearSelectionList();
      this.editGroupVisible = true;
    },

    handleEdit(index, row){
      this.dialogTitle = '修改标签';
      this.selectionsObj = this.tableData[index];
      this.editGroupVisible = true;
    },


    closeTopicDialog(){
      this.editGroupVisible = true;
      this.editTopicVisible = false;
    },

    releaseStatusFunc(idx){
      if(idx === 0){
        return `未使用`
      }else {
        return `${idx}个班级`
      }
    },


    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let self = this;
      let id = this.tableData[index].id;
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        deleteTags({id}).then((res) => {
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
      }).catch((e) => { console.log(e);});
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
    }

  },

  beforeRouteEnter(to, from, next) {
    getTagsList({
      "ids":[2,5],//ids不为空时按照ids查询，ids为空时按其余条件查询
      "name":"ch",
      "weight":0.87,
      "category":2
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
