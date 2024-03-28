<template>
    <div>
        <div id="header" class="clearfix">
            <h1>
                <router-link to="/">mysite</router-link>
            </h1>

            <ul v-if="this.$store.state.authUser != null">
                <li>{{this.$store.state.authUser.name}} 님 안녕하세요^^</li>
                <li><button v-on:click="logout" type="button" class="btn_s">로그아웃</button></li>
                <li><router-link class="btn_s" to="/user/modifyform">회원정보수정</router-link></li>
            </ul>
	
            <ul v-if="this.$store.state.authUser == null">
                <li><router-link class="btn_s" to="/user/loginform">로그인</router-link></li>
                <li><router-link class="btn_s" to="/user/joinform">회원가입</router-link></li>
            </ul>
        </div>
        <!-- //header -->   
        <div id="nav">
            <ul class="clearfix">
                <li><router-link to="">입사지원서</router-link></li>
                <li><router-link to="/board/list">게시판</router-link></li>
                <li><router-link to="">갤러리</router-link></li>
                <li><router-link to="/guestbook/addlist">방명록</router-link></li>
            </ul>
        </div> 
    </div>
</template>


<script>
import "@/assets/css/main.css"
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout(){
            console.log("로그아웃");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setToken", null);
        }
    },
    created(){}
};
</script>


<style></style>
