<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">SOE管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">温馨提示 : 欢迎来到SOE管理系统。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getUserInformation } from "../api/index";

export default {
    setup() {
        const router = useRouter();
        let userName = "15571696970";
        let password = "123456";
        const param = reactive({
            username: userName, password
        });

        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
             getUserInformation({phone:param.username || userName,pwd:param.password || password}).then((res) => {
                    let data = res.data;
                    let token = data.split("-")[2];
                    let strings = token.split("."); //截取token，获取载体
                    let userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
                    login.value.validate((valid) => {
                         if (valid) {
                                       ElMessage.success("登录成功");
                                       localStorage.setItem("ms_username", param.username);
                                       localStorage.setItem("userinfo", JSON.stringify(userinfo));
                                       localStorage.setItem("data", data);
                                       router.push("/");
                                      }else {
                                        ElMessage.error("登录成功");
                                        return false;
                                      }
                            });
                        }).catch((e)=>{
                         ElMessage.error("登录失败，用户名或者密码错误！");
                         console.log(e);
                         return false;
                        });
        };

        const store = useStore();
        store.commit("clearTags");

        return {
            param,
            rules,
            login,
            submitForm,
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpeg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>