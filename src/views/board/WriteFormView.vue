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
                    <div id="writeForm">
                        <form v-on:submit.prevent="write" method="get">
                            <!-- 제목 -->
                            <div class="form-group">
                                <label class="form-text" for="txt-title">제목</label>
                                <input type="text" id="txt-title" name="title" v-model="boardVo.title" placeholder="제목을 입력해 주세요">
                            </div>
                        
                            <!-- 내용 -->
                            <div class="form-group">
                                <textarea id="txt-content" v-model="boardVo.content"></textarea>
                            </div>
                            
                            <a id="btn_cancel" href="/board/list">취소</a>
                            <button id="btn_add" type="submit" >등록</button>
                            
                        </form>
                        <!-- //form -->
                    </div>
                    <!-- //writeForm -->
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
    name: "WriteFormView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            boardVo: {
                title: "",
                content: ""
            }
        };
    },
    methods: {
        write(){
            console.log("등록");
            axios({
                method: 'post',  //put,post,delete
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

                        //리스트로 이동
                        this.$router.push("/board/list");
                    } else {
                        console.log(response.data.message);
                        alert("로그인해주세요.");
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
