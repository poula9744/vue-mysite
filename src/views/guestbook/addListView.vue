<template>
    <div>
        <div id="wrap">

        <AppHeader/>

        <div id="container" class="clearfix">
            <div id="aside">
                <h2>방명록</h2>
                <ul>
                    <li>일반방명록</li>
                    <li>ajax방명록</li>
                </ul>
            </div>
            <!-- //aside -->

            <div id="content">
                
                <div id="content-head" class="clearfix">
                    <h3>일반방명록</h3>
                    <div id="location">
                        <ul>
                            <li>홈</li>
                            <li>방명록</li>
                            <li class="last">일반방명록</li>
                        </ul>
                    </div>
                </div>
                <!-- //content-head -->

                <div id="guestbook">
                    <form action="" method="">
                        <table id="guestAdd">
                            <colgroup>
                                <col style="width: 70px;">
                                <col>
                                <col style="width: 70px;">
                                <col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>
										<label class="form-text" for="input-uname">이름</label>
									</th>
									<td>
										<input id="input-uname" type="text" name="name" value="">
									</td>
									<th>
										<label class="form-text" for="input-pass">패스워드</label>
									</th>
									<td>
										<input id="input-pass" type="password" name="password" value="">
									</td>
                                </tr>
                                <tr>
                                    <td colspan="4"><textarea name="content" cols="72" rows="5"></textarea></td>
                                </tr>
                                <tr class="button-area">
                                    <td colspan="4" class="text-center"><button type="submit">등록</button></td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <!-- //guestWrite -->
                        <input type="hidden" name="action" value="add">
                        
                    </form>	
                    
                    <div v-bind:key="i" v-for="(guestbookVo, i) in guestbookList">
                        <table border="1" width="540px">
                            <tr>
                                <td>{{ guestbookVo.no }}</td>
                                <td>{{ guestbookVo.name }}</td>
                                <td>{{ guestbookVo.regDate }}</td>
                                <td><router-link v-bind:to="`/delete/${guestbookVo.no}`">삭제</router-link></td>
                            </tr>
                            <tr>
                                <td colspan="4">{{ guestbookVo.content }}</td>
                            </tr>
                        </table>
                        <br>
                    </div>
                    
        
                    
                </div>
                <!-- //guestbook -->
            
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
import axios from 'axios';
import "@/assets/css/guestbook.css";
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"

export default {
    name: "addListView",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            guestbookList: [],
            guestbookVo: {
                name: "",
                password: "",
                content: ""
            }
        };
    },
    methods: {
        getList(){
            console.log("데이터 가져오기");
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/guestbook',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.guestbookList = response.data;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){
        this.getList();
    }
};
</script>


<style></style>
