<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 语料展示
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <div class="addAndDeleteBtnList">
        <el-button type="primary"  @click="handleAdd()" class="addMaterialBtn">添加语料</el-button>
        <el-button type="primary"  @click="handleAddGroup()" class="addGroupBtn">添加语料组</el-button>
      </div>
      <div class="addGroup">

      </div>
      <el-table :data="tableData" border class="table"  @select="handleSelect" ref="multipleTable" @select-all="handleSelectAll" header-cell-class-name="table-header">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="id" label="语料标识" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="pinyin" label="拼音" align="center"></el-table-column>
        <el-table-column prop="refText" label="文本" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
<!--        <el-table-column prop="gmtCreate" label="创建时间" align="center"></el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.cur"
                       :page-size="query.size" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑添加语料弹出框 -->
    <el-dialog title="添加/修改语料" v-model="editVisible" width="30%">
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


    <el-dialog title="添加语料组" v-model="addGroups" width="30%">
      <el-form label-width="120px">
        <el-form-item label="语料组名称">
          <el-input v-model="groupsInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="语料组类型">
          <el-select v-model="groupsInfo.type" placeholder="请选择" style="width:100%;">
            <el-option key=0 label="单字" value=0></el-option>
            <el-option key=1 label="词语" value=1></el-option>
            <el-option key=2 label="句子" value=2></el-option>
            <el-option key=3 label="段落" value=3></el-option>
            <el-option key=5 label="古诗" value=5></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语料组描述">
          <el-input v-model="groupsInfo.description" ></el-input>
        </el-form-item>
        <el-form-item label="开始答题时间">
          <el-input v-model="groupsInfo.startTime" ></el-input>
        </el-form-item>
        <el-form-item label="截止答题时间">
          <el-input v-model="groupsInfo.endTime" ></el-input>
        </el-form-item>
        <div class="right">
          <div class="title">已选
<!--            <span class="clear" @click="handleCLearAll">清空全部</span>-->
          </div>
          <div class="one-selected" v-for="(item, index) in selections" :key="index">
            <span>{{item.id}}</span>
<!--            <span @click="cancelSelect(item, index)">X</span>-->
          </div>
        </div>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addGroups = false">取 消</el-button>
                    <el-button type="primary" @click="saveGroupsInfo">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getLanguageMaterial,addLanguageMaterial,addLanguageMaterialGroup } from "../api/index";

export default {
  name: "material",
  setup() {
    const query = reactive({
      cur: 1,
      size: 20,
    });
    let set = {
      0:"单字",
      1:"词语",
      2:"句子",
      3:"段落",
      5:"古诗"
    }
    let tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      getLanguageMaterial(query).then((res) => {
        if(res.code !== 0){
          console.log("数据为空")
          return;
        }
        let data = res.data;
        tableData.value = data.records;
        pageTotal.value = data.total || 50;
      }).catch((e)=>{
        tableData.value = [];
        pageTotal.value = 0;
      });
    };
    getData();

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const addGroups = ref(false);

    let form = reactive({
      id:"",
      type: "",
      level: "",
      pinyin:"",
      refText:""
    });

    let groupsInfo = reactive({
      name:"",
      type: "",
      description: "",
      startTime:"",
      endTime:""
    });
    let stateArr=[];
    let pageIndex =0;
    let idx = -1;
    let token = localStorage.getItem("data");

    const clear = (newForm) => {
      const keys = Object.keys(newForm);
      let obj = {};
      keys.forEach((item) => {
        obj[item] = "";
      });
      Object.assign(newForm, obj);
    };

    const saveEdit = () => {
      if(!form.refText){
        ElMessage({
          message: '语料文本内容不能为空.',
          type: 'warning',
        })
        return false;
      }
      editVisible.value = false;
      addMaterial();
      getData();
    };

    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        if(item === "type"){
          form[item] = set[row[item]];
        }else {
          form[item] = row[item];
        }
      });
      editVisible.value = true;
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {});
    };

    const handleAdd = () =>{
      clear(form);
      editVisible.value = true;
    };

    const addMaterial = () => {
      addLanguageMaterial({data:form,token}).then((res) => {
        if(res.code !== 0){
          ElMessage.error(`添加失败!`)
          return;
        }
        ElMessage.success(`添加语料成功!`);
      }).catch((e)=>{
        ElMessage.error(`添加失败，原因为${e}`)
      });
    };


    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      token,
      form,
      addGroups,
      pageIndex,
      groupsInfo,
      stateArr,
      clear,
      handleAdd,
      handleEdit,
      handleDelete,
      saveEdit
    };
  },

  data(){
    return {
      selectionsList:[]
    }
  },


  computed:{
    selections(){
      return this.selectionsList
    }
  },

  methods:{

    handleAddGroup(){
      this.addGroups = true;
    },
    handleSelect(selection, row){
      this.stateArr[this.pageIndex] = selection
      this.selectionsList = this.stateArr.flat()
    },
    handleSelectAll(){

    },
    // 查询操作
    handleSearch(){
      this.query.pageIndex = 1;
      this.getData();
    },
    // 分页导航
    handlePageChange(val){
      this.query.pageIndex = val;
      this.getData();
    },
    handleCLearAll(){

    },
    cancelSelect(){

    },

    saveGroupsInfo(){
      let groupName = (this.groupsInfo && this.groupsInfo.name) || "";
      if(!groupName){
        ElMessage({
          message: '语料组名称不能为空.',
          type: 'warning',
        })
        return false;
      }

      if(!this.selections.length){
        ElMessage({
          message: '语料组所选语料信息不能为空.',
          type: 'warning',
        })
        return false;
      }
      let ids = [];
      for(let i in this.selections){
        ids.push(this.selections[i].id);
      }
      addLanguageMaterialGroup(Object.assign({},this.groupsInfo,{corpusIds:ids},{token:this.token})).then((res) => {
        if(res.code !== 0){
          ElMessage.error(`添加失败!`)
          return;
        }
        ElMessage.success(`添加语料组成功!`);
        this.selections = [];
        this.clear(this.groupsInfo);
        this.stateArr[this.pageIndex] && this.stateArr[this.pageIndex].forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(this.tableData[item.index], false)
        })
        this.addGroups = false;
      }).catch((e)=>{
        ElMessage.error(`添加失败，原因为${e}`)
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}


.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}


.addMaterialBtn,.addGroupBtn {
  margin-bottom: 10px;
}

.addGroupBtn {
  left:75%;
  position: relative;
}
</style>
