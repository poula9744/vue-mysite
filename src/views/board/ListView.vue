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
                    <div id="list">
                        <form action="" method="">
                            <div class="form-group text-right">
                                <input type="text">
                                <button type="submit" id=btn_search>검색</button>
                            </div>
                        </form>
                        <table >
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>글쓴이</th>
                                    <th>조회수</th>
                                    <th>작성일</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-bind:key="i" v-for="(boardVo, i) in boardList">
                                    <td>{{ boardVo.no }}</td>
                                    <td><RouterLink v-bind:to="`/board/read/${boardVo.no}`">{{ boardVo.content }}</RouterLink></td>
                                    <td>{{ boardVo.name }}</td>
                                    <td>{{boardVo.hit}}</td>
                                    <td>{{ boardVo.regDate }}</td>
                                    <td v-if="this.$store.state.authUser != null">
                                        <router-link to="">[삭제]</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                        
                        <div v-if="this.$store.state.authUser != null">
                            <router-link id="btn_write" to="/board/writeform">글쓰기</router-link>
                        </div>
                        <div class="clear"></div>
                        <div>
                            <button id="btn_moreBoard" type="button" v-on:click="more">글 가져오기</button>
                        </div>
                        
                    </div>
                    <!-- //list -->
                </div>
                <!-- //board -->
            </div>
            <!-- //content  -->

        </div>
        <!-- //container  -->


        <AppFooter/>
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
    name: "ListView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            boardList: [],
            boardVo: {
                no: "",
                title: "",
                name: "",
                hit: "",
                regDate: ""
            }
        };
    },
    methods: {
        getList(){
            console.log("저장");
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/boards',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: boardVo, //get방식 파라미터로 값이 전달
                //data: boardVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.boardList = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        more(){
            console.log("더보기");
            
        }
    },
    created(){
        this.getList();
    }
};
</script>


<style></style>
