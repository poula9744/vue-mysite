<template>
    <div>
        <div id="wrap">

        <AppHeader/>

        <div id="container" class="clearfix">
            <div id="aside">
                <h2>게시판</h2>
                <ul>
                    <li><a href="">일반게시판</a></li>
                    <li><a href="">댓글게시판</a></li>
                </ul>
            </div>
            <!-- //aside -->

            <div id="content">

                <div id="content-head">
                    <h3>일반게시판</h3>
                    <div id="location">
                        <ul>
                            <li>홈</li>
                            <li>게시판</li>
                            <li class="last">일반게시판</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <!-- //content-head -->

                <div id="board">
                    <div id="modifyForm">
                        <form v-on:submit.prevent="modify" method="put">
                            <!-- 작성자 -->
                            <div class="form-group">
                                <span class="form-text">작성자</span>
                                <span class="form-value">{{ boardVo.name }}</span>
                            </div>
                            
                            <!-- 조회수 -->
                            <div class="form-group">
                                <span class="form-text">조회수</span>
                                <span class="form-value">{{ boardVo.hit }}</span>
                            </div>
                            
                            <!-- 작성일 -->
                            <div class="form-group">
                                <span class="form-text">작성일</span>
                                <span class="form-value">{{ boardVo.regDate }}</span>
                            </div>
                            
                            <!-- 제목 -->
                            <div class="form-group">
                                <label class="form-text" for="txt-title">제목</label>
                                <input type="text" id="txt-title" name="title" v-model="boardVo.title">
                            </div>
                        
                            
                            
                            <!-- 내용 -->
                            <div class="form-group">
                                <textarea id="txt-content" v-model="boardVo.content"></textarea>
                            </div>

                            <input type="text" name="no" v-model="this.$route.params.no">

                            <a id="btn_cancel" href="">취소</a>
                            <button id="btn_modify" type="submit" >수정</button>
                            
                        </form>
                        <!-- //form -->
                    </div>
                    <!-- //modifyForm -->
                </div>
                <!-- //board -->
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
import "@/assets/css/board.css";
import axios from 'axios';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
    name: "ModifyFormView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            boardVo: {
                no: "",
                title: "",
                name: "",
                hit: "",
                content:"",
                regDate: "",
                userNo: ""
            }
        };
    },
    methods: {
        read(){
            console.log("read");
            this.boardVo.no = this.$route.params.no;
            console.log(this.boardVo.no);
            
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/board/'+ this.boardVo.no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: boardVo, //get방식 파라미터로 값이 전달
                data: this.boardVo.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.boardVo = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        modify(){
            console.log("modify");
            this.boardVo.no = this.$route.params.no;
            console.log(this.boardVo);
            axios({
                method: 'put',  //put,post,delete
                url: 'http://localhost:9000/api/board',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입
                //params: phonebookVo, //get방식 파라미터로 값이 전달
                data: this.boardVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response);
                console.log(response.data.apiData); //수신데이타

                if(response.data.result == "success"){
                    console.log("result: success");

                    this.$router.push("/board/read/"+this.$route.params.no);
                    
                } else {
                    console.log(response.data.message);
                    alert("수정할 수 없습니다");
                    this.$router.push("/board/list");
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){
        this.read();
    }
};
</script>


<style></style>
