<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 语料组
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.id" placeholder="语料组标识" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" :span-method="spanMethod">
        <el-table-column prop="id" label="语料组标识" align="center"></el-table-column>
        <el-table-column prop="name" label="语料组名称" align="center"></el-table-column>
        <el-table-column prop="description" label="语料组描述" align="center"></el-table-column>
        <el-table-column prop="type" label="语料组类型" align="center"></el-table-column>
        <el-table-column prop="cpsrcdNum" label="题目数量" align="center"></el-table-column>
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

    <!-- 编辑查看语料组弹出框 -->
    <el-dialog title="修改语料组信息" class="editGroups" v-model="editGroupVisible" width="30%">
      <el-form label-width="120px">
        <el-form-item label="语料组名称">
          <el-input v-model="selections.name" ></el-input>
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
      <div class="yuLiaoList">
        <div class="selectedListTitle">已选列表
          <el-button type="primary" icon="el-icon-edit" @click="openMaterialList" class="updateMaterial">修改语料</el-button>
        </div>

      <el-scrollbar style="height:100%">
        <el-table :data="selections.list" header-cell-class-name="table-header"  border >
          <el-table-column prop="id" label="语料标识" align="center"></el-table-column>
          <el-table-column prop="name" label="语料名称" align="center"></el-table-column>
          <el-table-column prop="pinyin" label="拼音" align="center"></el-table-column>
          <el-table-column prop="refText" label="文本" align="center"></el-table-column>
        </el-table>
      </el-scrollbar>
      </div>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editGroupVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>


    <!-- 编辑修改语料弹出框 -->
    <el-dialog title="修改语料组信息" class="editGroups" v-model="editMaterialVisible" width="30%" >
      <div class="allYuLiaoList">
        <el-scrollbar style="height:100%">
          <el-table :data="allMaterials" header-cell-class-name="table-header"  border  ref="multipleSelectionsTable" @select="handleSelect" @select-all="handleSelectAll">
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

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  showAllLanguageMaterialGroup,
  deleteLanguageMaterialGroup,
  getCurrentLanguageMaterialGroup,
  getLanguageMaterial
} from "../api/index";

export default {
  name: "materialGroup",
  setup() {
    const query = reactive({
      cur: 1,
      size: 30,
    });

    let tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      showAllLanguageMaterialGroup(query).then((res) => {
        let records = res.data.records;
        tableData.value = records;

        let total = res.data.total;
        pageTotal.value = total;
      }).catch((e)=>{
        tableData.value = [];
        pageTotal.value = 0;
      });
    };
    getData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };


    // 表格编辑时弹窗和保存
    const editGroupVisible = ref(false);
    const editMaterialVisible = ref(false);
    let token = localStorage.getItem("data");


    return {
      query,
      token,
      tableData,
      getData,
      pageTotal,
      editGroupVisible,
      editMaterialVisible,
      handleSearch,
      handlePageChange
    };
  },

  data(){
    return {
      selectionsObj:{
        list:[],
        name:"",
        type:"",
        description:""
      },
      materialsList:[],
      tempList:[]
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

    },


    clearSelectionList(){
      this.selectionsObj ={
        list:[],
        name:"",
        type:"",
        description:""
      }
    },

    handleEdit(index, row){
      let id = this.tableData[index].id;
      getCurrentLanguageMaterialGroup({id}).then((res)=>{
        this.clearSelectionList();
        let name = res.data.name;
        let cpsrcdList = res.data.cpsrcdList;
        this.selectionsObj.name = name;
        this.selectionsObj.type = res.data.type;
        this.selectionsObj.description = res.data.description;
        for(let i in cpsrcdList){
          for(let j =0; j < cpsrcdList[i].corpus_list.length;j++){
            this.selectionsObj.list.push({name,
              type:cpsrcdList[i].type,id:cpsrcdList[i].corpus_list[j].id,
              pinyin:cpsrcdList[i].corpus_list[j].pinyin,refText:cpsrcdList[i].corpus_list[j].refText})
          }
        }
        this.editGroupVisible = true;
      }).catch((e)=>{
        this.clearSelectionList();
        console.log(e);
      })
    },

    // 删除操作
    handleDelete(index){
      // 二次确认删除
      let self = this;
      let id = this.tableData[index].id;
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
            deleteLanguageMaterialGroup({id,token:self.token}).then((res) => {
              if(res.data === 1){
                ElMessage.success("删除成功");
                self.getData();
              }else{
                ElMessage.error("删除失败");
              }
            }).catch((e)=>{
              console.log(e);
              ElMessage.error("删除失败");
            });
          })
          .catch((e) => { console.log(e);});
    },

    openMaterialList(){
      let list = this.selectionsObj.list;
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
      this.selectionsObj.list = this.tempList;
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


    spanMethod(data){
      // const {row,rowIndex,columnIndex} = data;
      // if (columnIndex < 2 || columnIndex > 3) {  //班级合并展示区
      //   const len = this.typeListLth(row.type);
      //   const lenName = this.classNameLen(row.type);
      //   if (rowIndex === lenName) {   //某班级首位学生行
      //     return {
      //       rowspan:len,
      //       colspan:1
      //     }
      //   } else return {   //某班级非首位学生行
      //     rowspan: 0,
      //     colspan: 0
      //   };
      // } else {  //学生信息展示区
      //   return {
      //     rowspan: 1,
      //     colspan: 1
      //   };
      // }
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
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
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.addBtn {
  margin-bottom: 10px;
}

.editGroups{
  height: 500px;
  overflow: auto;
}

.yuLiaoList {
  height: 200px;
  /*overflow-y: auto;*/
  text-align: center;
  margin-bottom: 20px;
}

.allYuLiaoList {
  height: 300px;
  overflow-y: auto;
  text-align: center;
}

.selectedListTitle {
  margin-bottom: 5px;
}

.updateMaterial{
  left: 30%;
  position: relative;
}
</style>
