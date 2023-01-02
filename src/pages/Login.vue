<template>
  <div class="background">
    <vue-title title="GoGreen - Đăng nhập"></vue-title>
    <div class="container">
      <div class="header-login">
        <h4 class="title-form">Đăng nhập</h4>
        <div class="icon-container">
          <font-awesome-icon icon="fa-brands fa-facebook-f" inverse style="cursor: pointer" @click="signInWithFacebook"/>
          <font-awesome-icon icon="fa-brands fa-google" inverse style="cursor: pointer" @click="signInWithGmail"/>
          <font-awesome-icon icon="fa-brands fa-twitter" inverse style="cursor: pointer"/>
        </div>
      </div>
      <el-form ref="formLogin" id="formLogin" :model="formLogin" :rules="ruleFormLogin" class="form-login">
        <el-form-item style="width: 95%" label="" label-width="0" prop="username">
          <el-input v-model="formLogin.username" placeholder="Tài khoản"></el-input>
        </el-form-item>
        <el-form-item style="width: 95%" label="" label-width="0" prop="password">
          <el-input v-model="formLogin.password" placeholder="Password" show-password></el-input>
        </el-form-item>
        <div class="remember-switch-container">
          <el-switch
            v-model="remember"
            active-color="#29a974"
            inactive-color="#bbbbbb">
          </el-switch>
          <span style="color: #29a974">Ghi nhớ đăng nhập</span>
        </div>
        <el-button :loading="isSigningIn" class="login-button" @click="signIn">Đăng nhập</el-button>
        <div class="sign-up-container">
          Bạn chưa có tài khoản?
          <span class="sign-up-link" @click="signUp">
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
  background-image: url('../../public/img/background-admin-2.jpg');
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
  background-color: #29a974;
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
  background: #29a974;
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
  background: #33b47e;
}
>>> .el-input__inner:focus{
  border-color: #29a974;
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
  color: #29a974;
  font-weight: bold;
  cursor: pointer;
}
.sign-up-link:hover{
  color: #33b47e;
}
</style>

<script>
import {requiredRule} from "@/utils/Validate";
import firebase from 'firebase'
import VueTitle from "@/components/VueTitle";
import {errAlert} from "@/utils/Alert";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";

export default {
  components: {
    VueTitle
  },
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
      },
      remember: '',
      ruleFormLogin: {
        username: [requiredRule('Tài khoản',['change', 'blur'])],
        password: [requiredRule('Password',['change', 'blur'])],
      },
      isSigningIn: false
    }
  },
  methods: {
    signIn() {
      this.$refs.formLogin.validate(valid => {
        if(!valid) return false
        this.isSigningIn = true
        // setTimeout(() => {
        //   this.$router.push('/admin/dashboard')
        //   this.isSigningIn = false
        // }, 3000)
        ApiFactory.callAPI(ConstantAPI['LOGIN'], this.formLogin, '').then(rs => {
          console.log(rs)
        }).catch(err => {
          errAlert(this, err)
        }).finally(() => {
          this.isSigningIn = false
        })
      })
    },
    signInWithGmail() {
      this.isSigningIn = true
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.push('/admin/dashboard')
        this.isSigningIn = false
      }).catch((err) => {
        console.log(err)
        this.isSigningIn = false
      });
    },
    signInWithFacebook() {
      this.isSigningIn = true
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.push('/admin/dashboard')
        this.isSigningIn = false
      }).catch((err) => {
        console.log(err)
        if(err.code === 'auth/account-exists-with-different-credential') {
          let provider2 = new firebase.auth.GoogleAuthProvider();
          provider2.setCustomParameters({login_hint: err.email});
          firebase.auth().signInWithPopup(provider2).then((result) => {
            this.$router.push('/admin/dashboard')
          }).catch(err => {
            errAlert(this, 'Hãy tắt pop-up block của trình duyệt')
          })
        }
        this.isSigningIn = false
      });
    },
    signUp() {
      console.log(firebase.auth().currentUser)
      console.log(firebase.auth())
    }
  }
}
</script>
