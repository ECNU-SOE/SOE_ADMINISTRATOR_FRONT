<template>
  <div>
    <el-row>
      <el-card body-style="padding: 0" >
        <el-col :span="6">
          <el-upload
              style="width:100%;text-align: center;margin-top: 0.2rem;"
              action=""
              :show-file-list="false"
              :on-success="updateClassPic"
              :before-upload="beforeUpload">
            <el-image class="classPic"
                :src="pictureUrl"></el-image>
          </el-upload>
        </el-col>
        <el-col class="classDesc" :span="8">
          <el-descriptions title="" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
            <el-descriptions-item label="班级名称" prop="name" span="3" >{{currentClass.name}}</el-descriptions-item>
            <el-descriptions-item label="班级编号" prop="id" span="3">{{currentClass.id}}</el-descriptions-item>
            <el-descriptions-item label="起止时间" prop="gmtCreate" span="3">{{getCurrentTime(currentClass.gmtCreate) + '~' + getCurrentTime(currentClass.gmtModified)}}</el-descriptions-item>
            <el-descriptions-item label="授课教师" prop="description" span="3">{{currentClass.teacher}}</el-descriptions-item>
            <el-descriptions-item label="班级水平" prop="description" span="3">{{currentClass.level}}</el-descriptions-item>
            <el-descriptions-item label="人数限制" prop="description" span="3">{{currentClass.stuLimit}}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="1">
          <el-button size="small" type="primary" icon="el-icon-refresh" @click="updateClass()" style="position: absolute;margin-top:0.15rem;right: 2.5rem;">
            更换班级
          </el-button>
        </el-col>
        <el-col :span="8" style="margin-left: 0.2rem;">
          <el-card style="margin-top: 0.2rem;">
            <el-input  type="textarea" :autosize="{ minRows: 6}" disabled placeholder="班级公告："></el-input>
            <el-button  size="mini" type="primary" @click="handleUpdateClassInfo($event)" style="position: absolute;margin-left: -0.55rem;margin-top: 0.65rem;">发布公告</el-button>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <el-tabs type="border-card" style="width: 101%;margin-top: 1%;position: relative;" :stretch=true  @tab-click="handleSelectTabs" v-model="tabSelect">
      <el-tab-pane label="学生管理" name="student">
        <div class="userCls">
          <label class="userNum">共{{classMembersNum}}人</label>
          <el-button class="addStudentCls" size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addStudent()">
            添加学生
          </el-button>
          <el-button class="exportXlsCls" size="small" type="primary" icon="el-icon-upload2" @click="exportXls()">
            导出名单
          </el-button>
          <el-input  class="selectStudent" placeholder="请输入学号或者姓名"></el-input>
          <el-button class="searchStudent" size="mini" type="text" icon="el-icon-search" @click="searchStudent()"/>
        </div>
        <el-table :data="classMembers" border class="userTable" stripe>
<!--          <el-table-column prop="id" label="序号" align="center"/>-->
          <el-table-column prop="realName" label="姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.realName}}
              <i :class="sexIcon[scope.row.sex]" slot="reference"/>
            </template>
          </el-table-column>
          <el-table-column prop="identifyId" label="学工号" align="center"/>
          <el-table-column prop="firstLanguage" label="母语" align="center"/>
          <el-table-column prop="rType" label="成员类型" align="center">
            <template slot-scope="scope">
              {{ memberType[scope.row.rtype]}}
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="加入时间" align="center" width="200px">
            <template slot-scope="scope">
              {{ getCurrentTime(scope.row.gmtCreate)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdateMem(scope.$index, scope.row)">更新</el-button>
              /<el-button type="text" @click="handleDeleteMem(scope.$index, scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="教学团队" name="teacher">教学团队</el-tab-pane>
      <el-tab-pane label="考试作业" name="test">
        <div v-if="classDetail === false">
          <div style="width: 100%;margin:0.1rem;">
            <el-radio v-model="radio" label="all" size="mini">全部</el-radio>
            <el-radio v-model="radio" label="notStart" size="mini">未开始</el-radio>
            <el-radio v-model="radio" label="processing" size="mini" >进行中</el-radio>
            <el-radio v-model="radio" label="stopped" size="mini" >已结束</el-radio>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleAddJob()" style="margin-left: 30%;">
              新建作业
            </el-button>
            <el-button size="small" type="primary" icon="el-icon-delete" @click="handleMaterialGroup()">
              语料组库
            </el-button>
          </div>
          <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex">
            <el-card style="margin-top: 1%;width: 30%; float: left;margin-left: 2%;margin-bottom: 1%;">
              <el-descriptions :title="subItem.name" :contentStyle="contentStyle" :labelStyle="labelStyle">
                <el-descriptions-item label="课程标识" prop="id" span="3">{{subItem.id}}</el-descriptions-item>
                <el-descriptions-item label="课程描述" prop="description" span="3">{{subItem.description}}</el-descriptions-item>
                <el-descriptions-item label="创建时间" prop="gmtCreate" span="3">{{subItem.gmtCreate}}</el-descriptions-item>
                <el-descriptions-item label="结束时间" prop="gmtModified" span="3">{{subItem.gmtModified}}</el-descriptions-item>
              </el-descriptions>
              <el-button size="small" type="primary" @click="handleUpdate(subIndex)">
                修改
              </el-button>
              <el-button size="small" type="primary" @click="handleGetDetail(subIndex)">
                查看
              </el-button>
            </el-card>
          </div>
        </div>
       <div v-else>

       </div>
      </el-tab-pane>
      <el-tab-pane label="话题讨论" name="topic">
        <div v-if="topicDetail === false">
          <div class="userCls">
            <label class="userNum">共{{topicNum}}个话题</label>
            <el-dropdown>
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon-s-unfold"></i>时间顺序</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>时间顺序</el-dropdown-item>
                <el-dropdown-item>时间倒序</el-dropdown-item>
                <el-dropdown-item>按点赞数</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleAddTopic()" style="position:absolute;right: 1rem;">
              新建话题
            </el-button>
          </div>
          <div style="overflow: auto;max-height: 2.2rem;margin-bottom: 0.1rem;">
            <div v-for="(subItem,subIndex) in topicInfoList" :key="subIndex">
              <el-card style="margin-top: 1%;float: left;width:95%;margin-left: 2%;margin-bottom: 0.1rem;">
                <el-row>
                  <el-col :span="4">
                    <el-image :src="pictureUrl" style="width:0.8rem;"></el-image>
                  </el-col>
                  <el-col :span="17">
                    <el-descriptions title="" :contentStyle="contentStyle" :labelStyle="labelItemStyle">
                      <el-descriptions-item label="话题发布者" prop="gmtCreate" >{{subItem.publisher}}</el-descriptions-item>
                      <el-descriptions-item label="发布时间" prop="gmtModified" >{{getCurrentTime(subItem.releaseTime)}}</el-descriptions-item>
                    </el-descriptions>
                    <el-row style="padding:0.1rem 0rem 0rem 0.2rem;">
                      <el-descriptions :title="subItem.discussTitle" :contentStyle="contentStyle">
                        <el-descriptions-item label="内容" prop="discussContent" span="3">{{subItem.discussContent}}</el-descriptions-item>
                      </el-descriptions>
                    </el-row>
                  </el-col>
                  <el-col :span="2">
                    <el-dropdown @command="handleTopicSelect($event,subIndex)">
                      <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="top">置顶</el-dropdown-item>
                        <el-dropdown-item command="forward">转发</el-dropdown-item>
                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
        <div v-else>
          <div>
            <el-button size="small" type="primary" icon="el-icon-arrow-left" @click="handleReturnTopic()" style="margin: 0.1rem 0 0 0.2rem;">
              返回
            </el-button>
          </div>
          <div style="overflow: auto;max-height: 2.2rem;margin-bottom: 0.1rem;">
            <el-card style="margin-top: 1%;float: left;width:95%;margin-left: 2%;">
              <el-row>
                <el-col :span="4">
                  <el-image :src="pictureUrl" style="width:0.8rem;"></el-image>
                </el-col>
                <el-col :span="17">
                  <div style="text-align: center;font-size: 0.12rem;font-weight: bold;">{{currentTopic.discussTitle}}</div>
                  <el-descriptions title="" :contentStyle="contentStyle" :labelStyle="labelItemStyle">
                    <el-descriptions-item label="话题发布者" prop="gmtCreate" >{{currentTopic.publisher}}</el-descriptions-item>
                    <el-descriptions-item label="发布时间" prop="gmtModified" >{{getCurrentTime(currentTopic.releaseTime)}}</el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="3">
                  <i class="iconfont">&#xe83f;</i>
                  <span style="padding: 0.12rem;"><i class="el-icon-chat-round" style="transform: scale(1.5);padding-right: 0.02rem"></i>{{currentTopic.replyNumber}}</span>
                  <el-dropdown @command="handleTopicSelect($event,subIndex)">
                    <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="top">置顶</el-dropdown-item>
                      <el-dropdown-item command="forward">转发</el-dropdown-item>
                      <el-dropdown-item command="edit">编辑</el-dropdown-item>
                      <el-dropdown-item command="delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div style="height: 0.18rem;">
            <label class="replyLabel">共{{currentTopic.replyNumber}}条评论</label>
            <el-dropdown style="padding-left: 0.2rem;">
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon-s-unfold"></i>时间顺序</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>时间顺序</el-dropdown-item>
                <el-dropdown-item>时间倒序</el-dropdown-item>
                <el-dropdown-item>按点赞数</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-radio-group v-model="radio" @change="changeDiscussList">
              <el-radio label="all" size="mini"  style="padding-left: 0.2rem;">所有评论</el-radio>
              <el-radio label="currentClass" size="mini">本班评论</el-radio>
            </el-radio-group>
            <label style="padding: 0.2rem">已发布{{currentTopic.publishClassesNum}}个班级</label>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleAddDiscuss()" style="position:absolute;right: 1rem;">
              评论
            </el-button>
          </div>
          <div>
            <div v-for="(subItem,subIndex) in topicReply" :key="subIndex">
              <el-card style="margin-top: 1%;float: left;width:95%;margin-left: 2%;margin-bottom: 0.1rem;">
                <el-row>
                  <el-col :span="4">
                    <el-image :src="pictureUrl" style="width:0.8rem;"></el-image>
                  </el-col>
                  <el-col :span="17">
                    <el-descriptions title="" :contentStyle="contentStyle" :labelStyle="labelItemStyle">
                      <el-descriptions-item label="回复" prop="gmtCreate" >{{subItem.publisher}}</el-descriptions-item>
                      <el-descriptions-item label="时间" prop="gmtModified" >{{getCurrentTime(subItem.releaseTime)}}</el-descriptions-item>
                      <el-descriptions-item  prop="gmtModified" >{{subIndex+1}}楼</el-descriptions-item>
                    </el-descriptions>
                    <el-row style="padding:0.1rem 0rem 0rem 0.2rem;">
                      <el-descriptions :title="subItem.discussContent" :contentStyle="contentStyle">
                        <el-descriptions-item label="内容" prop="discussContent" span="3">{{subItem.discussContent}}</el-descriptions-item>
                      </el-descriptions>
                    </el-row>
                  </el-col>
                  <el-col :span="3">
                    <i class="iconfont">&#xe83f;</i>
                    <span style="padding: 0.12rem;"><i class="el-icon-chat-round" style="transform: scale(1.5);padding-right: 0.02rem"></i>{{currentTopic.replyNumber}}</span>
                    <el-dropdown @command="handleTopicSelect($event,subIndex)">
                      <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="top">置顶</el-dropdown-item>
                        <el-dropdown-item command="forward">转发</el-dropdown-item>
                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="资料管理" name="resource">资料管理</el-tab-pane>
      <el-tab-pane label="班级设置" name="class">班级设置</el-tab-pane>
    </el-tabs>

    <!-- 更换班级弹出框 -->
    <el-dialog title="更换班级" :visible.sync="updateClassVisible" width="30%">
      <div style="max-height: 2.667rem;overflow-y: auto;">
        <div v-for="(subItem,subIndex) in classInfoList" :key="subIndex" style="width: 99%;">
          <el-row>
              <el-card @click.native="selectClass($event,subIndex)" style="margin: 0.1rem 0.1rem 0 0.1rem;">
                <el-col :span="21">
                  <el-descriptions :title="subItem.name" :columns="3" :contentStyle="contentStyle" :labelStyle="labelStyle">
                    <el-descriptions-item label="授课教师" prop="id" span="3" label-class-name="my-content" content-class-name="my-content">{{subItem.teacher}}</el-descriptions-item>
                    <el-descriptions-item label="开始时间" prop="gmtCreate" span="3" label-class-name="my-content" content-class-name="my-content">{{getCurrentTime(subItem.gmtCreate)}}</el-descriptions-item>
                    <el-descriptions-item label="结束时间" prop="gmtModified" span="3" label-class-name="my-content" content-class-name="my-content">{{getCurrentTime(subItem.gmtModified)}}</el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="2">
                  <el-radio v-model="classRadio" :label="subIndex">{{''}}</el-radio>
                </el-col>
              </el-card>
          </el-row>
        </div>
        <el-card @click.native="handleAddClass()" style="width: 91%;margin: 0.1rem 0 0 0.1rem;">
        <span class="el-icon-plus" >
         新建班级
        </span>
        </el-card>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <label style="margin-right: 20%;font-size:0.1rem;">共有{{classNum}}个课程班</label>
                    <el-button @click="updateClassVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveClass">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加学生弹出框 -->
    <el-dialog title="添加学生" :visible.sync="addStudentVisible" width="38%">
      <div style="min-height: 2.667rem;">
        <el-tabs type="border-card" :stretch=true style="width: 35%;position:relative;width:101%;">
          <el-tab-pane label="手动导入">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 0.1rem;">
                <el-row>
                    <el-col :span="10">
                        <el-form-item class="nameInput" label="姓名" style="margin-left:0.02rem;">
                            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="phoneInput" label="手机号">
                            <el-input v-model="formInline.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                        <el-button size="small" type="primary" icon="el-icon-edit" @click="getCurrentStudent()" style="margin-left:0.02rem;">查询</el-button>
                    </el-form-item></el-col>
                </el-row>
            </el-form>
            <div style="margin-bottom: 0.25rem;max-height: 2rem;overflow-y: auto;">
              <div v-for="(subItem,subIndex) in usersList" :key="subIndex">
                <el-row>
                  <el-card style="margin-top: 1%;width: 96%; float: left;margin-left: 2%;margin-bottom: 1%;">
                    <el-col :span="4">
                      <el-checkbox label="" @change="updateCurrentSelect($event,subIndex)"></el-checkbox>
                    </el-col>
                    <el-col :span="19">
                      <el-descriptions title="" :contentStyle="contentStyle" :labelStyle="labelStyle">
                        <el-descriptions-item label="姓名" prop="realName" >{{subItem.realName}}</el-descriptions-item>
                        <el-descriptions-item label="性别" prop="sex" >{{sexTypeFuc(subItem.sex)}}</el-descriptions-item>
                        <el-descriptions-item label="母语" prop="firstLanguage" >{{subItem.firstLanguage}}</el-descriptions-item>
                        <el-descriptions-item label="学工号" prop="identifyId">{{subItem.identifyId}}</el-descriptions-item>
                        <el-descriptions-item label="手机号" prop="phone">{{subItem.phone}}</el-descriptions-item>
                      </el-descriptions>
                    </el-col>
                  </el-card>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量导入">
          </el-tab-pane>
          <el-tab-pane label="课程导入">
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addStudentVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveStudent">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加学生弹出框 -->
    <el-dialog title="新建班级" :visible.sync="addClassVisible" width="30%" :show-close=false>
      <div>
        <el-form  label-width="1rem" :rules="newClassRules" :model="newClass">
          <el-form-item>
            所属班级:{{newClass.courseName}}
          </el-form-item>
          <el-form-item label="班级名称" prop="name" style="width: 70%;">
            <el-input v-model="newClass.name" placeholder="请输入班级名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCloseAddClass">取 消</el-button>
                    <el-button type="primary" @click="handleSaveAddClass">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog title="新建主题" :visible.sync="addTopicVisible" width="30%" :show-close=false>
      <div>
        <el-form  label-width="0.5rem" :model="tempTopicObj">
          <el-row>
            <el-col :span="20">
              <el-form-item label="话题标题" prop="discussTitle">
                <el-input v-model="tempTopicObj.discussTitle" placeholder="请输入话题标题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="话题内容" prop="discussTest">
                <el-input type="textarea" v-model="tempTopicObj.discussTest" placeholder="请输入话题内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="自由发言" prop="audioUrl">
                <el-input v-model="tempTopicObj.audioUrl" ></el-input>
                <el-upload
                    class="upload-demo"
                    action=""
                    :on-change="audioUrlChange"
                    :show-file-list="false">
                  <el-button size="small" type="primary" :loading="loadingStatus">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addTopicVisible=false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveAddTopic">确 定</el-button>
                </span>
      </template>
    </el-dialog>

    <el-dialog title="回复" :visible.sync="addDiscussVisible" width="30%" :show-close=false>
      <div>
        <el-form  label-width="0.5rem" :model="tempTopicObj">
          <el-row>
            <el-col :span="20">
              <el-form-item label="回复几楼" prop="discussTest">
                <el-input-number  v-model="tempTopicObj.parentId" placeholder="1"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="回复内容" prop="discussTest">
                <el-input v-model="tempTopicObj.discussTest" placeholder="请输入话题内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="自由发言" prop="audioUrl">
                <el-input v-model="tempTopicObj.audioUrl" ></el-input>
                <el-upload
                    class="upload-demo"
                    action=""
                    :on-change="audioUrlChange"
                    :show-file-list="false">
                  <el-button size="small" type="primary" :loading="loadingStatus">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addDiscussVisible=false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveAddDiscuss">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {getUsers,getCurrentUsers} from '@/api/system/sys_user'
import {getClassInformation,getClassMembers,addClass,addClassMembers,getTopicInformation,
  getTopicReply,insertTopic,replyDiscuss,topTopic,forwardTopic,getClassDiscussInfo} from "@/api/system/sys_class";
import {getCurrentTimeStr} from "@/lib/utils";

export default {
  name: "classSet",

  created() {
    this.handleSelectTabs();
  },
  data(){
    return {
      courseId:sessionStorage.getItem("courseId"),
      pictureUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      contentStyle:{
        // "text-align":"center"
        "overflow":"hidden",
        "text-overflow":"ellipsis",
        "white-space":"nowrap"
      },
      contentItemStyle:{

      },
      labelItemStyle:{
        "text-align":"center;",
        "margin-left":"0.2rem"
      },
      labelStyle:{
        "text-align":"center;",
        "margin-left":"5px"
      },
      classInfoList:[],
      topicInfoList:[],
      currentClass:{},
      currentTopic:{},
      tempTopicObj:{
        discussTest:"",
        discussTitle:""
      },
      topicReply:[],
      choseClass:{},
      radio:"all",
      classRadio:-1,
      formInline:{
        name:'',
        phone:''
      },
      loadingStatus:false,
      updateClassVisible:false,
      addStudentVisible:false,
      addClassVisible:false,
      addTopicVisible:false,
      addDiscussVisible:false,
      topicDetail:false,
      //话题详情显示与否标志
      classDetail:false,
      //课程详情显示与否标志
      classMembers:[],
      classNum:0,
      topicNum:0,
      classMembersNum:0,
      selectUserList:[],
      sexIcon:{0:"el-icon-female",1:"el-icon-male"},
      memberType:{1:"学生",2:"助教",3:"老师",4:"管理员"},
      newClass:{name:"", courseName:sessionStorage.getItem("courseName"),},
      newClassRules:{
        name:[{required: true, message: '请输入班级名字',trigger:'blur'}]
      },
      usersList:[],
      tabSelect:"student"
    }
  },

  methods: {
    exportXls(){

    },

    sexTypeFuc(idx){
      switch (idx){
        case -1:
          return '未知';
        case 0:
          return '女';
        case 1:
          return '男';
      }
    },

    getCurrentTime(time){
      return getCurrentTimeStr(time);
    },

    updateClass(){
      let idx = -1;
      let item = this.currentClass;
      this.classInfoList.forEach(function (it,index){
        if(it.id === item.id){
          idx = index;
        }
      })
      this.classRadio = idx;
      this.updateClassVisible = true;
    },

    getClassList(){
      getClassInformation({courseId:this.courseId}).then((res)=>{
        this.setClassData(res);
      })
    },

    getTopicList(){
      getTopicInformation({classId:this.currentClass.id,pageNum:1,pageSize:10}).then((res)=>{
        this.setTopicData(res);
      })
    },

    handleSaveClass(){
      let tempClass = JSON.parse(JSON.stringify(this.choseClass));
      if(Object.keys(tempClass).length){
        this.currentClass = tempClass;
        this.showClassInfo(tempClass);
      }
      this.updateClassVisible = false;
    },


    selectClass($event,index){
      this.choseClass = JSON.parse(JSON.stringify(this.classInfoList[index]));
    },

    handleAddClass(){
      this.updateClassVisible = false;
      this.addClassVisible = true;
    },


    handleSaveAddClass(){
      addClass({name:this.newClass.name,courseId:this.courseId}).then(res=>{
          if(res.code === 0){
            this.$message({message: "新增班级成功!", type: 'success'});
            this.getClassList();
          }
      }).catch(e=>{
        this.$message({message: `新增班级失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addClassVisible = false;
      this.updateClassVisible = true;
    },

    handleCloseAddClass(){
      this.addClassVisible = false;
      this.updateClassVisible = true;
    },

    addStudent(){
      getUsers({},{pageNum:1,pageSize:999}).then(res=>{
        if(res.code === 0){
          this.usersList = res.data.records;
        }
      }).catch(e=>{
        this.$message({message: `查询用户列表失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addStudentVisible = true;
    },

    handleAddJob(){

    },

    handleAddTopic(){
      this.tempTopicObj = {
        discussTest:"",
        discussTitle:""
      }
      this.addTopicVisible = true;
    },

    handleAddDiscuss(){
      this.tempTopicObj = {
        discussTest:"",
        discussTitle:""
      }
      this.addDiscussVisible = true;
    },

    handleMaterialGroup(){
      this.$router.push({path:"/home/sysmaterialgroup"})
    },

    handleSaveStudent(){
      let tempList = JSON.parse(JSON.stringify(this.selectUserList));
      let classId = this.currentClass.id;
      for(let i = 0; i < tempList.length; i++){
        addClassMembers({accountNo:tempList[i].accountNo,classId,type:1}).then(res=>{
          if(res.data){
            this.$message({message: "添加用户到当前课程成功!", type: 'success'});
            this.getClassList();
          }
        }).catch(e=>{
          this.$message({message: `添加用户到当前课程失败，原因为:${e.msg}`, type: 'error'});
          console.log(e);
        });
      }
      this.addStudentVisible = false;

    },

    handleUpdateMem(){

    },

    handleDeleteMem(){

    },

    showClassInfo(tempObj){
      getClassMembers({classId:tempObj.id}).then(res=>{
        this.classMembers = res.data.records;
        this.classMembersNum = this.classMembers.length;
      }).catch(e=>{

      })
    },


    setClassData(data){
      if(data){
        this.classInfoList = data.data.records;
        let tempObj = JSON.parse(JSON.stringify(this.classInfoList[0])) || {};
        tempObj.gmtCreate = this.getCurrentTime(tempObj.gmtCreate);
        tempObj.gmtModified = this.getCurrentTime(tempObj.gmtModified);
        this.currentClass = tempObj;
        this.classNum = this.classInfoList.length;
       this.showClassInfo(tempObj);
      }
    },

    setTopicData(data){
      if(data){
        this.topicInfoList = data.data.records;
        this.topicNum = this.topicInfoList.length;
      }
    },

    beforeUpload(){

    },


    updateClassPic(){

    },

    updateCurrentSelect(flag,idx){
      let item = this.usersList[idx]
      if(flag){
        if(!this.selectUserList.find(it=>it.accountNo === item.accountNo)){
          this.selectUserList.push(item);
        }
      }else {
        if(this.selectUserList.find(it=>it.accountNo === item.accountNo)){
          let deleteIdx = this.selectUserList.findIndex(it=>it.accountNo === item.accountNo);
          this.selectUserList.splice(deleteIdx,1);
        }
      }
    },

    getCurrentStudent(){
      getCurrentUsers({account_list:this.formInline.phone}).then(res=>{
        this.usersList = res.data.records;
      }).catch(e=>{

      })
    },

    handleUpdateClassInfo(){

    },

    searchStudent(){

    },

    handleUpdate(){

    },

    handleGetDetail(){
      this.classDetail = true;

    },


    handleSelectTabs(){
      switch(this.tabSelect){
        case "student":
        default:
          this.getClassList();
          break;
        case "teacher":
          break;
        case "topic":
          this.getTopicList();
          break;

      }

    },

    handleTopicSelect(operation,idx){
      this.currentTopic = this.topicInfoList[idx];
      switch (operation){
        case"top":
          topTopic({discussId:this.currentTopic.discussId}).then((res)=>{
            if(res.data){
              this.$message({message: `置顶成功`, type: 'success'});
            }
          }).catch((e)=>{
            this.$message({message: `置顶失败，原因为:${e.msg}`, type: 'error'});
            console.log(e);
          });
          break;
        case"forward":
          forwardTopic({forwardId:this.currentTopic.discussId,classId:this.currentClass.id,discussTest:'又得改代码，难顶'}).then((res)=>{
            if(res.data){
              this.$message({message: `转发成功`, type: 'success'});
            }
          }).catch((e)=>{
            this.$message({message: `转发失败，原因为:${e.msg}`, type: 'error'});
            console.log(e);
          });
            break;
        case"edit":
          getTopicReply({discussId:this.currentTopic.discussId}).then((res)=>{
            this.topicReply = res.data.records;
          }).catch();
          this.topicDetail = true;
          break;
        case"delete":
          break;
      }
    },

    handleReturnTopic(){
      this.topicDetail = false;
      this.handleSelectTabs();
    },

    audioUrlChange(){

    },

    handleSaveAddTopic(){
      let obj = Object.assign({audioUrl:[]},this.tempTopicObj,{classId:this.currentClass.id})
      insertTopic(obj).then((res)=>{
        if(res.code === 0){
          this.$message({message: "新增话题成功!", type: 'success'});
          this.getTopicList();
        }
      }).catch((e)=>{
        this.$message({message: `新增话题失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addTopicVisible = false;
    },

    handleSaveAddDiscuss(){
      let obj = Object.assign({audioUrl:[]},this.tempTopicObj,{classId:this.currentClass.id})
      replyDiscuss(obj).then((res)=>{
        if(res.code === 0){
          this.$message({message: "回复成功!", type: 'success'});
          this.getTopicList();
        }
      }).catch((e)=>{
        this.$message({message: `回复失败，原因为:${e.msg}`, type: 'error'});
        console.log(e);
      });
      this.addDiscussVisible = false;
    },

    changeDiscussList(value){
      if(value === "currentClass"){
        let obj = Object.assign({},{classId:this.currentClass.id})
        getClassDiscussInfo(obj).then((res)=>{
          if(res.code === 0){
            this.topicReply = res.data.records;
          }
        }).catch((e)=>{
          this.$message({message: `回复失败，原因为:${e.msg}`, type: 'error'});
          console.log(e);
        });
      }else {
        getTopicReply({discussId:this.currentTopic.discussId}).then((res)=>{
          this.topicReply = res.data.records;
        }).catch();
      }
    }

  }
}
</script>

<style scoped>

.classPic {
  margin: 5%;
  height: 0.8rem;
}

.classDesc{
  margin-left: 0.18rem;
  margin-top:0.18rem;
}

.userCls{
  margin: 0.05rem;
  height: 0.2rem
}

.userNum{
  margin: 0.05rem;
  font-size: 1.2em;
}

.addStudentCls{
  position: absolute;
  right: 2.3rem;
  height: 0.2rem;
}

.exportXlsCls{
  position: absolute;
  right: 1.6rem;
  height: 0.2rem;
}

.active {
  background-color: skyblue;
}

.my-content {
  background: black;
}

.selectStudent>>>.el-input__inner{
  border-radius: 0.1rem    /*输入框圆角值*/
}

.nameInput>>>.el-form-item__content{
width:calc(100% - 0.3rem);
}

.phoneInput>>>.el-form-item__content{
width:calc(100% - 0.4rem);
}

.selectStudent {
  position: absolute;
  width: 20%;
  right: 0.3rem;
  border-radius: 0.1rem;
}

.searchStudent{
  position: absolute;
  right: 0.15rem;
  height: 0.2rem;
}

.userTable{
  margin: 0.05rem 0 0.05rem 0.05rem
}

.icon, .iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.replyLabel{
  padding-left: 0.2rem;
}


</style>