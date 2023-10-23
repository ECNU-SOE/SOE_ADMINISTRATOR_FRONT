<template>
  <div>
    <div id='chartCenter' style='width:100%;height:1.8rem;'></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {completionStatistics} from "@/api/system/sys_statistics";
import {getClassInformation} from "@/api/system/sys_class";
export default {
  name: 'chartCenter',
  mounted(){
    this.drawLine()
  },
  data(){
    return {
      classInfoList:[],
    }
  },
  props:{
    courseId:{
      type:String
    }
  },
  methods:{
    drawLine(){
      // 初始化实例
      let myChart = echarts.init(document.getElementById('chartCenter'))
      let seriesData = [];
      let courseId = this.courseId
      getClassInformation({courseId}).then((res)=>{
        completionStatistics({courseId,classId:res.data.records[0].id}).then((resData)=>{
          seriesData = resData.data.records;
        }).catch((e)=>{
          this.$message({message: `获取数据失败，原因为${e.msg}`, type: 'error'});
        });
      }).catch((e)=>{
        this.$message({message: `获取班级信息失败，原因为${e.msg}`, type: 'error'});
      })
      // 绘制图表，定义数据
      let option = {
        title: {
          text: '完成比例',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 渲染数据
      myChart.setOption(option, true);
    },


    getClassList(){

    },

  }
}
</script>
