<template>
  <div class="background">
    <div class="container">
      <div class="header-login">
        <h4 class="title-form">Đăng nhập</h4>
        <div class="icon-container">
          <font-awesome-icon icon="fa-brands fa-facebook-f" inverse/>
          <font-awesome-icon icon="fa-brands fa-google" inverse/>
          <font-awesome-icon icon="fa-brands fa-twitter" inverse/>
        </div>
      </div>
      <el-form ref="formLogin" id="formLogin" :model="formLogin" :rules="ruleFormLogin" class="form-login">
        <el-form-item style="width: 95%" label="" label-width="0" prop="account">
          <el-input v-model="formLogin.account" placeholder="Tài khoản"></el-input>
        </el-form-item>
        <el-form-item style="width: 95%" label="" label-width="0" prop="password">
          <el-input v-model="formLogin.password" placeholder="Password" show-password></el-input>
        </el-form-item>
        <div class="remember-switch-container">
          <el-switch
            v-model="remember"
            active-color="#9665EEFF"
            inactive-color="#bbbbbb">
          </el-switch>
          <span style="color: #9665EEFF">Ghi nhớ đăng nhập</span>
        </div>
        <button class="login-button" @click="signIn">Đăng nhập</button>
        <div class="sign-up-container">
          Bạn chưa có tài khoản?
          <span class="sign-up-link">
            Đăng ký
          </span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 72, 255, 0.5), rgba(154, 124, 252, 0.5)); ;
}
.container {
  width: 400px;
  height: 450px;
  background-color: #FFFFFF;
  border-radius: 10px;
  position: relative;
}
.header-login {
  width: 92%;
  height: 140px;
  background-color: rgb(150, 101, 238);
  border-radius: 10px;
  position: absolute;
  top: -20px;
  left: 4%;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
.title-form {
  font-weight: bold;
  text-align: center;
  color: #FFF;
}
.icon-container {
  display: flex;
  justify-content: center;
  gap: 50px
}
.form-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
}
.remember-switch-container {
  display: flex;
  width: 95%;
  gap: 10px;
  margin-top: 5px;
}
.login-button {
  width: 95%;
  margin-top: 40px;
  background: #9665EEFF;
  border-radius: 8px;
  outline: none;
  border: none;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: bold;
  padding: 12px;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
.login-button:hover {
  background: #a57dee;
}
>>> .el-input__inner:focus{
  border-color: #a57dee;
  outline: 0;
}
.sign-up-container{
  width: 95%;
  text-align: center;
  color: #525252;
  font-size: 14px;
  margin-top: 20px;
}
.sign-up-link{
  color: #9665EEFF;
  font-weight: bold;
  cursor: pointer;
}
.sign-up-link:hover{
  color: #ae8bee;
}
</style>

<script>
import {requiredRule} from "@/utils/Validate";

export default {
  data() {
    return {
      formLogin: {
        account: '',
        password: '',
      },
      remember: '',
      ruleFormLogin: {
        account: [requiredRule('Tài khoản',['change', 'blur'])],
        password: [requiredRule('Password',['change', 'blur'])],
      }
    }
  },
  methods: {
    signIn() {
      this.$refs.formLogin.validate(valid => {
        if(!valid) return false
      })
      console.log('alo')
    }
  }
}
</script>
