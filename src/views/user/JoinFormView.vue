<template>
    <div>
        <div id="wrap">

        <AppHeader/>

        <div id="container" class="clearfix">
            <div id="aside">
                <h2>회원</h2>
                <ul>
                    <li>회원정보</li>
                    <li>로그인</li>
                    <li>회원가입</li>
                </ul>
            </div>
            <!-- //aside -->

            <div id="content">
            
                <div id="content-head">
                    <h3>회원가입</h3>
                    <div id="location">
                        <ul>
                            <li>홈</li>
                            <li>회원</li>
                            <li class="last">회원가입</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <!-- //content-head -->

                <div id="user">
                    <div id="joinForm">
                        <form v-on:submit.prevent="join" action="" method="post">

                            <!-- 아이디 -->
                            <div class="form-group">
                                <label class="form-text" for="input-uid">아이디</label> 
                                <input type="text" id="input-uid" name="id" v-model="userVo.id" placeholder="아이디를 입력하세요">
                                <button type="button" id="">중복체크</button>
                            </div>

                            <!-- 비밀번호 -->
                            <div class="form-group">
                                <label class="form-text" for="input-pass">패스워드</label> 
                                <input type="text" id="input-pass" name="password" v-model="userVo.password" placeholder="비밀번호를 입력하세요"	>
                            </div>

                            <!-- 이메일 -->
                            <div class="form-group">
                                <label class="form-text" for="input-name">이름</label> 
                                <input type="text" id="input-name" name="name" v-model="userVo.name" placeholder="이름을 입력하세요">
                            </div>

                            <!-- //나이 -->
                            <div class="form-group">
                                <span class="form-text">성별</span> 
                                
                                <label for="rdo-male">남</label> 
                                <input type="radio" id="rdo-male" name="gender" value="male" v-model="userVo.gender"> 
                                
                                <label for="rdo-female">여</label> 
                                <input type="radio" id="rdo-female" name="gender" value="female" v-model="userVo.gender"> 

                            </div>

                            <!-- 약관동의 -->
                            <div class="form-group">
                                <span class="form-text">약관동의</span> 
                                
                                <input type="checkbox" id="chk-agree" value="" name="">
                                <label for="chk-agree">서비스 약관에 동의합니다.</label> 
                            </div>
                            
                            <!-- 버튼영역 -->
                            <div class="button-area">
                                <button type="submit" id="btn-submit">회원가입</button>
                            </div>
                            
                        </form>
                    </div>
                    <!-- //joinForm -->
                </div>
                <!-- //user -->
            </div>
            <!-- //content  -->
        </div>
        <!-- //container  -->

        <AppFooter/>
        <!-- //footer -->

        </div>
        <!-- //wrap -->
    </div>
</template>


<script>
import "@/assets/css/user.css"
import axios from 'axios';
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"

export default {
    name: "JoinFormView",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            userVo: {
                id: "",
                password: "",
                name: "",
                gender: ""
            }
        };
    },
    methods: {
        join(){
            console.log("join");
            console.log(this.userVo);
            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/api/user/join',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: userVo, //get방식 파라미터로 값이 전달
                data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타 authUser
               if(response.data == 1){
                this.$router.push("/user/joinok");
               } else {
                alert("회원가입에 실패했습니다.");
               }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){}
};
</script>


<style></style>
