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
        <el-input v-model="query.id" placeholder="语料组标识,默认(1588871928125460480)" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="handleDelete" class="deleteGroup">删除语料组</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" :span-method="spanMethod">
        <el-table-column prop="name" label="语料组名称" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="id" label="语料标识" align="center"></el-table-column>
        <el-table-column prop="pinyin" label="拼音" align="center"></el-table-column>
        <el-table-column prop="refText" label="文本" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.cur"
                       :page-size="query.size" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { showAllLanguageMaterialGroup,deleteLanguageMaterialGroup } from "../api/index";

export default {
  name: "materialGroup",
  setup() {
    const query = reactive({
      cur: 1,
      size: 20,
    });

    let tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      showAllLanguageMaterialGroup(query).then((res) => {
        let name = res.name;
        let cpsrcdList = res.cpsrcdList;
        let count = 0;
        tableData.value = [];
        for(let i in cpsrcdList){
          for(let j =0; j < cpsrcdList[i].corpus_list.length;j++){
            count++;
            tableData.value.push({name,
              type:cpsrcdList[i].type,id:cpsrcdList[i].corpus_list[j].id,
            pinyin:cpsrcdList[i].corpus_list[j].pinyin,refText:cpsrcdList[i].corpus_list[j].refText})
          }
        }
        pageTotal.value = count;
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
    const editVisible = ref(false);
    const addVisible = ref(false);
    let form = reactive({
      id:"",
      type: "",
      level: "",
      pinyin:"",
      refText:""
    });
    let idx = -1;
    let token = localStorage.getItem("data");



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
    const handleDelete = () => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            deleteLanguageMaterialGroup({id:query.id,token}).then((res) => {
             if(res.data === 1){
               ElMessage.success("删除成功");
               getData();
             }
            }).catch((e)=>{
              console.log(e);
            });
          })
          .catch((e) => { console.log(e);});
    };

    const handleAdd = () =>{
      addVisible.value = true;
    };


    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      addVisible,
      form,
      handleAdd,
      handleSearch,
      handlePageChange,
      handleEdit,
      handleDelete,
    };
  },

  computed:{
    groupNum(){
      return new Set(this.tableData.map(o => o.type));
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

    spanMethod(data){
      const {row,rowIndex,columnIndex} = data;
      if (columnIndex < 2 || columnIndex > 3) {  //班级合并展示区
        const len = this.typeListLth(row.type);
        const lenName = this.classNameLen(row.type);
        if (rowIndex === lenName) {   //某班级首位学生行
          return {
            rowspan:len,
            colspan:1
          }
        } else return {   //某班级非首位学生行
          rowspan: 0,
          colspan: 0
        };
      } else {  //学生信息展示区
        return {
          rowspan: 1,
          colspan: 1
        };
      }
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

.deleteGroup {
  background-color: red;
  border: red;
}
</style>
