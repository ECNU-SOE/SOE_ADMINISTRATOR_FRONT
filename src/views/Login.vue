<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="" class="sign-in-form">
          <h2 class="title">SOE</h2>
          <h2 class="title systemTitle">后台管理系统</h2>
          <div class="input-field">
            <i class="fa fa-user"></i>
            <input type="text" v-model="loginForm.username" placeholder="phone">
          </div>
          <div class="input-field">
            <i class="fa fa-lock"></i>
            <input type="password"  v-model="loginForm.password" placeholder="Password">
          </div>
          <div v-show="loginForm.errorVisible">
          {{loginForm.errorMsg}}
          </div>

          <el-row :gutter="20">
            <input type="button" @click="userpwdLogin" value="登 录" class="btn solid">
          </el-row>

        </form>

        <form action="" class="sign-up-form">
          <h2 class="title systemTitle">用户注册</h2>
          <div class="input-field">
            <i class="fa fa-user"></i>
            <input type="text" placeholder="phone" v-model="loginForm.username">
          </div>
          <div class="input-field">
            <i class="fa fa-envelope"></i>
            <input type="text" placeholder="nickName" v-model="loginForm.nickName">
          </div>
          <div class="input-field">
            <i class="fa fa-lock"></i>
            <input type="password" placeholder="password" v-model="loginForm.password">
          </div>
          <div class="input-field">
            <i class="fa fa-lock"></i>
            <input type="password" placeholder="repeat" v-model="loginForm.repeat" >
          </div>
          <input type="button" value="注 册" class="btn solid"  @click="registerUserName" >


        </form>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>新用户注册</h3>
            <button class="btn transparent" id="sign-up-btn">去注册</button>
          </div>

          <img src="../assets/img/log.svg" class="image" alt="">
        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>已经注册过？</h3>
            <button class="btn transparent" id="sign-in-btn">去登录</button>
          </div>

          <img src="../assets/img/register.svg" class="image" alt="">
        </div>
      </div>
    </div>
  </div>


</template>

<script>
    import {setJwtToken} from '@/lib/utils'
    import {login,registerUser} from '@/api/system/sys_user'
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: "",
                    nickName:"",
                    repeat:"",
                    password: "",
                    errorMsg:"",
                    errorVisible: false
                },
                dialogVisible: false
            };
        },
       mounted(){
          const sign_in_btn = document.querySelector("#sign-in-btn");
          const sign_up_btn = document.querySelector("#sign-up-btn");
          const container = document.querySelector(".container");

          sign_up_btn.addEventListener('click',()=>{
            container.classList.add("sign-up-mode");
            this.clearLoginObj();
          })

          sign_in_btn.addEventListener('click',()=>{
            container.classList.remove("sign-up-mode");
            this.clearLoginObj();
          })
        },
        methods:{
            userpwdLogin(){
                login(this.loginForm.username,
                    this.loginForm.password
                ).then(res =>{
                  this.$message({message: `登录成功`, type: 'success'});
                  let token = res.data;
                  // let strings = token.split("."); //截取token，获取载体
                  // let userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
                    setJwtToken(token)
                    this.$router.push({path:"/home"})
                }).catch(err => {
                    this.$message({message: `登录失败，请验证账号密码之后重新登录`, type: 'error'});
                    this.loginForm.errorMsg = err.message;
                    // this.loginForm.errorVisible = true;
                });
            },
            registerUserName(){
              if(!/^1[345678]\d{9}$/.test(this.loginForm.username)){
                this.$message({message: `注册失败，目前只支持中国大陆的手机号码`, type: 'error'});
                return;
              }
              if(this.loginForm.password !== this.loginForm.repeat){
                this.$message({message: `注册失败，两次输入的密码不一致`, type: 'error'});
                return;
              }
              if(!this.loginForm.password){
                this.$message({message: `注册失败，密码不能为空`, type: 'error'});
                return;
              }
              if(!this.loginForm.username){
                this.$message({message: `注册失败，用户名不能为空`, type: 'error'});
                return;
              }
              registerUser({
                phone:this.loginForm.username,
                nickName:this.loginForm.nickName,
                pwd:this.loginForm.password
              }).then(res =>{
                this.$message({message: `注册成功`, type: 'success'});
                const container = document.querySelector(".container");
                container.classList.remove("sign-up-mode");
              }).catch(e=>{
                this.$message({message: `注册失败，原因为${e.msg}`, type: 'error'});
              })
              },
            getPassword(){

            },
            clearLoginObj(){
              this.loginForm = {
                  username: "",
                  nickName:"",
                  repeat:"",
                  password: "",
                  errorMsg:"",
                  errorVisible: false
              }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /* google字体库 */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, input{
    font-family: 'Poppins',sans-serif;
  }

  .solid{
    width: 300px !important;
    margin-top: 20px;
  }

  .container{
    position: relative;
    width: 100%;
    min-height:100vh;
    background-color: #fff;
    overflow: hidden;
  }

  .container::before{
    content: '';
    position: absolute;
    width: 2000px;
    height: 2000px;
    border-radius: 50%;
    background: linear-gradient(-45deg,#4481eb,#04befe);
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    z-index: 6;
    transition: 1.8s ease-in-out;
  }

  .forms-container{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

  }

  .signin-signup{
    position: absolute;
    top: 50%;
    left: 50%;
    /* 作用是什么 */
    transform: translate(-50%,-50%);
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    transition: 1s 0.7s ease-in-out;
  }

  form{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5rem;
    overflow: hidden;
    /* 难点 */
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    /* delay防止表单提前暴露 */
    transition: 0.2s 0.7s ease-in-out;
  }

  form.sign-in-form{
    z-index: 2;
  }

  form.sign-up-form{
    z-index: 1;
    opacity: 0;
  }

  .systemTitle{
    width: 2.667rem;
    text-align: center;
  }

  .title{
    font-size: 0.2rem;
    color: #444;
    margin-bottom: 10px;
  }

  .input-field{
    width: 1.5rem;
    height: 55px;
    background-color: #f0f0f0;
    margin: 10px 0;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 .1rem;
  }

  .input-field i{
    text-align: center;
    line-height: 55px;
    color: #acacac;
    font-size: 0.12rem;
  }

  .input-field input{
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 0.1rem;
    color: #333;
  }

  .input-field input::placeholder{
    color: #aaa;
    font-weight: 500;
  }

  .btn{
    width: 150px;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 49px;
    cursor: pointer;
    background-color: #5995fd;
    color: #fff;
    /* 大写 */
    text-transform: uppercase;
    font-weight: 600;
    margin: 10xp 0;
    /* 动画延迟 */
    transition: .5s;
  }

  .btn:hover{
    background-color: #4d84e2;
  }

  .social-text{
    padding: .7rem 0;
    font-size: 1rem;
  }

  .social-media{
    display: flex;
    justify-content: center;
  }

  .social-icon{
    height: 40px;
    width: 40px;
    border: 1px solid #333;
    margin: 0 0.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
    border-radius: 50%;
    transition: 0.3s;
  }

  .social-icon:hover{
    color: #4481eb;
    border-color: #44b1eb;
  }

  .panels-container{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2,1fr);
  }

  .panel{
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    text-align: center;
    justify-content: center;
    z-index: 7;
  }

  .panel .content{
    color: #fff;
    transition: .9s .6s ease-in-out;
  }

  .panel h3{
    font-weight: 600;
    line-height: 1;
    font-size: 0.14rem;
  }

  .panel p{
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }

  .btn.transparent{
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.1rem;
  }

  .left-panel{
    pointer-events: all;
    padding: 0rem 17% 1.5rem 0rem;
  }

  .right-panel{
    pointer-events: none;
    padding: 1rem 12% 2rem 17%;
  }

  .image{
    width: 100%;
    transition: 1.1s .4s ease-in-out;
  }

  .right-panel .content, .right-panel .image{
    transform: translateX(800px);
  }

  .container.sign-up-mode:before{
    transform: translate(100%,-50%);
    right: 52%;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content
  {
    transform: translateX(-800px);
  }

  .container.sign-up-mode .right-panel .content,
  .container.sign-up-mode .right-panel .image{
    transform: translateX(0px);
  }

  .container.sign-up-mode .left-panel {
    pointer-events: none;
  }

  .container.sign-up-mode .right-panel{
    pointer-events: all;
  }

  .container.sign-up-mode .signin-signup{
    left: 3%;
  }

  .container.sign-up-mode form.sign-in-form{
    z-index: 1;
    opacity: 0;
  }

  .container.sign-up-mode form.sign-up-form{
    z-index: 2;
    opacity: 1;
  }

  @media(max-width: 870px){
    .container{
      min-height: 800px;
      height: 100vh;

    }

    .container:before{
      width: 1500px;
      height: 1500px;
      left: 30%;
      bottom: 68%;
      transform: translateX(-50%);
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }

    .signin-signup{
      width: 100%;
      left: 50%;
      top: 85%;
      transform: translate(-50%,-100%);
      transition: 1s 0.8s ease-in-out;
    }

    .panels-container{

      z-index: 10;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }

    .panel{
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 2.5rem 8%;
    }


    .image{
      width: 200px;
      transition: 0.9s 0.6s ease-in-out;
    }

    .left-panel{
      grid-row: 1 / 2;
    }

    .right-panel{
      grid-row: 3 / 4;
    }

    .panel h3{
      font-size: 1.2rem;
    }

    .panel p{
      font-size: 0.7rem;
      padding: 0.5rem 0;
    }

    .btn.btn.transparent{
      width: 110px;
      height: 35px;
      font-variation-settings: 0.7rem;
    }

    .panel .content{
      padding-right: 15%;
      transition: 0.9s 0.8s ease-in-out;
    }

    .right-panel .content, .right-panel .image{
      transform: translateY(300px);
    }

    .container.sign-up-mode:before{
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content{
      transform: translateY(-300px);
    }

    .container.sign-up-mode .signin-signup{
      top: 5%;
      transform: translate(-50%,0);
      left: 50%;
    }
  }

  @media (max-width: 465px){
    form{
      padding: 0 1.5rem;
    }

    .image{
      display: none;
    }

    .container .left-panel .content,
    .container .right-panel .content
    {
      margin-left: 40px;
    }

  }
</style>