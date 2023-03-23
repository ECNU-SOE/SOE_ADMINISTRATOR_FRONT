<template>
  <div>

    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="materialQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="语料标识" prop="roleLike">
              <el-input v-model="materialQueryForm.idLike"
                        placeholder="请输入语料标识"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
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
      <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn" icon="el-icon-plus" size="small" style="margin: 0 0 10px 20px">添加语料</el-button>

      <el-table :data="tableData" border class="table"  ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="语料标识" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="pinyin" label="拼音" align="center"></el-table-column>
        <el-table-column prop="refText" label="文本" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
        <!--        <el-table-column prop="gmtCreate" label="创建时间" align="center"></el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle
                       @click="handleEdit(scope.$index, scope.row)"/>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle
                       @click="handleDelete(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 编辑添加语料弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
      <el-form label-width="120px">
        <el-form-item label="语料类型">
          <el-select v-model="form.type" placeholder="请选择" style="width:100%;">
            <el-option key=0 label="单字" value=0></el-option>
            <el-option key=1 label="词语" value=1></el-option>
            <el-option key=2 label="句子" value=2></el-option>
            <el-option key=3 label="段落" value=3></el-option>
            <el-option key=5 label="古诗" value=5></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语料级别">
          <el-input v-model="form.level" ></el-input>
        </el-form-item>
        <el-form-item label="语料拼音">
          <el-input v-model="form.pinyin" ></el-input>
        </el-form-item>
        <el-form-item label="语料文本内容">
          <el-input v-model="form.refText"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import { getLanguageMaterial,addLanguageMaterial } from '@/api/system/sys_material'
import {getJwtToken} from "@/lib/utils";

export default {
  name: "material",

  data(){
    return {
      materialQueryForm:{
        idLike: ""
      },
      tableData:[],
      dialogTitle:'',
      form:{
        id:"",
        type: "",
        level: "",
        pinyin:"",
        refText:""
      },
      groupsInfo:{
        name:"",
        type: "",
        description: "",
        startTime:"",
        endTime:""
      },
      pageTotal:0,
      editVisible:false,
      query:{
        cur: 1,
        size: 20,
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


  methods:{


    // 查询操作
    handleSearch(){
      this.query.pageIndex = 1;
      getLanguageMaterial({id:this.materialQueryForm.idLike}).then((res)=>{
        this.setData(res);
      })
    },

    setData(data){
     if(data){
       this.tableData = data.data.records;
       this.pageTotal = data.data.total || 50;
     }
    },


    saveEdit(){
      if(!this.form.refText){
        this.$message({message: "语料文本内容不能为空.", type: 'warning'});
        return false;
      }
      this.editVisible = false;
      this.submitForm();
      getLanguageMaterial({}).then((res)=>{
        this.setData(res);
      })
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
      this.dialogTitle = "修改角色"
      Object.keys(this.form).forEach((item) => {
        this.form[item] = row[item];
      });
    },

    // 删除操作
    handleDelete(index){
      // 二次确认删除
      this.$confirm("确定要删除吗？").then(() => {
        this.$message({message: "删除成功", type: 'success'});
        this.tableData.splice(index, 1);
      }).catch(() => {});
    },

    handleAdd(){
      this.dialogTitle = '新增语料';
      this.clear(this.form);
      this.editVisible = true;
    },


    submitForm(){
      if(this.form){
        if(this.form.id){
          this.$message({message: "修改失败，目前无修改接口!", type: 'error'});
        }else {
          addLanguageMaterial({data:this.form,token:getJwtToken()}).then((res) => {
            if(res.code !== 0){
              this.$message({message: "添加失败!", type: 'error'});
              return;
            }
            this.$message({message: "添加语料成功!", type: 'success'});
          }).catch((e)=>{
            this.$message({message: `添加失败，原因为${e}`, type: 'error'});
          });
        }
      }
    }

  },

  beforeRouteEnter(to, from, next) {
    getLanguageMaterial({}).then(res => {
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
