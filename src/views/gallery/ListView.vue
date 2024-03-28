<template>
    <div>
        <div id="wrap">

        <AppHeader/>


        <div id="container" class="clearfix">
            <div id="aside">
                <h2>갤러리</h2>
                <ul>
                    <li><a href="">일반갤러리</a></li>
                    <li><a href="">파일첨부연습</a></li>
                </ul>
            </div>
            <!-- //aside -->
            
            <div id="content">
                <div id="content-head">
                    <h3>일반갤러리</h3>
                    <div id="location">
                        <ul>
                            <li>홈</li>
                            <li>갤러리</li>
                            <li class="last">일반갤러리</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
                <!-- //content-head -->

                
                <div id="gallery">
                    <div id="list">
                
                            <div v-if="this.$store.state.authUser != null">
                                <button id="btnImgUpload" v-on:click="uploadBtn">이미지올리기</button>
                            </div>
                            <div class="clear"></div>

                
                            <ul id="viewArea">
                            
                            <!-- 이미지반복영역 -->
                            <div v-for="(galleryVo, i) in galleryList" v-bind:key="i">
                                <li>
                                    <div class="view" v-on:change="viewModal">
                                        <img class="imgItem" v-on:click="openViewModal(galleryVo.no, galleryVo.saveName, galleryVo.content)" v-bind:src="`http://localhost:9000/upload/${galleryVo.saveName}`">
                                        <div class="imgWriter">작성자: <strong>{{ galleryVo.name }}</strong></div>
                                    </div>
                                </li>
                            </div>
                            <!-- 이미지반복영역 -->
                            
                            
                        </ul>
                    </div>
                    <!-- //list -->
                </div>
                <!-- //	gallery -->

            </div>
            <!-- //content  -->

        </div>
        <!-- //container  -->


        <AppFooter/>
        <!-- //footer -->
        </div>
        <!-- //wrap -->

        <!-- 이미지등록 팝업(모달)창 -->
        <div id="addModal" class="modal">
            <div class="modal-content">
                <form v-on:submit.prevent="uploadFile"  action="" method="post" enctype="multipart/form-data">
                    <div class="closeAddBtn" v-on:click="closeAddModal">×</div>
                    <div class="m-header">이미지 등록</div>
                    <div class="m-body">
                        <div>
                            <label class="form-text">글작성</label> 
                            <input id="addModalContent" type="text" name="content" v-model="galleryVo.content">
                        </div>
                        <div class="form-group">
                            <label class="form-text">이미지선택</label> 
                            <input id="file" type="file" name="img" v-on:change="selectFile">
                        </div>
                    </div>
                    <div class="m-footer">
                        <button type="submit" id="save">저장</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- 이미지보기 팝업(모달)창 -->
        <div id="viewModal" class="modal">
            <div class="modal-content">
                <div class="closeViewBtn" v-on:click="closeVieweModal" >×</div>
                <div class="m-header">이미지보기</div>
                <div class="m-body">
                    <div>
                        <img id="viewModelImg" value="">
                        <input type="hidden" id="m-no" name="no" value="">
                        <!-- ajax로 처리 : 이미지출력 위치-->
                    </div>
                    <div>
                        <p id="viewModelContent"></p>
                    </div>
                </div>
                <div class="m-footer">
                    <c:if test="${sessionScope.authUser.no != null}">
                        <button class="btnDelete" id="btnDelete" v-on:click="deleteFile">삭제</button>
                    </c:if>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import "@/assets/css/gallery.css";
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
            galleryList: [],
            galleryVo: {
                no: "",
                name: "",
                content: "",
                filePath: "",
                orgName: "",
                saveName: "",
                fileSize: ""
            },
            file: ""
        };
    },
    methods: {
        getList(){
            console.log("리스트");
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/gallery',
                headers: { "Content-Type": "multipart/form-data" }, //*전송타입: 멀티파트로 변경
                //params: galleryVo, //get방식 파라미터로 값이 전달
                //data: galleryVo,
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data);
                this.galleryList = response.data;

                
            }).catch(error => {
                console.log(error);
            });
        },
        uploadBtn(){
            console.log("모달창 보이기");
            let modal = document.querySelector("#addModal");
            modal.style.display = "block";
        },
        openViewModal(no, saveName, content){
            console.log("openViewModal");
            let modal = document.querySelector("#viewModal");
            modal.style.display = "block";

            let noTag = document.querySelector('[name="no"]');
            noTag.value = no;
            console.log(noTag);

            let saveTag = document.querySelector('#viewModelImg');
            saveTag.src = "http://localhost:9000/upload/" + saveName;
            console.log(saveTag);

            let contentTag = document.querySelector('#viewModelContent');
            contentTag.textContent = content;
        },
        selectFile(event){
            console.log("파일선택");
            this.file = event.target.files[0];
        },
        uploadFile(){
            console.log("파일업로드");

            //서버전송용 전용박스
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("content", this.galleryVo.content);
            //* --> data로 보낸다 (Json방식이 아니다)

            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/api/gallery',
                headers: { "Content-Type": "multipart/form-data" 
                , "Authorization": "Bearer " + this.$store.state.token}, //*전송타입: 멀티파트로 변경
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //*Json으로 보내지 않지만 data로 전송
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                console.log(response.data.apiData);
                let modal = document.querySelector("#addModal");
                modal.style.display = "none";

            }).catch(error => {
                console.log(error);
            });
        },
        deleteFile(){
            console.log("삭제클릭");
            let no = document.querySelector("#m-no").value;
            // 서버로 전송
            axios({
                method: 'delete', // put, post, delete 
                url: 'http://localhost:9000/api/gallery/'+ no,
                headers: {"Content-Type" : "application/json; charset=utf-8"
                , "Authorization": "Bearer " + this.$store.state.token}, //전송타입
                params: {no}, //get방식 파라미터로 값이 전달
                //data: galleryVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                
                responseType: 'json' //수신타입
            }).then(function (response) {
                console.log(response);
                console.log(response.data);

                if(response.data.result == "success"){
                    console.log("result: success");
                    this.$router.push("/gallery/list");
                    
                } else {
                    console.log(response.data.message);
                    alert("로그인하세요");

                }
                
            }).catch(function (error) {
                console.log(error);
            }); 
        
        
        },
        //모달창 닫기 버튼(X) 클릭했을 때
        closeAddModal(){
            console.log("클릭");
            let modal = document.querySelector("#addModal");
            modal.style.display = "none";
        },
        closeVieweModal(){
            console.log("클릭");
            let modal = document.querySelector("#viewModal");
            modal.style.display = "none";
        }
    },
    created(){
        this.getList();
    }
};
</script>


<style>
    /*모달창 배경 회색부분*/
    .modal{
		width: 100%; /*가로 전체*/
		height: 100%; /*세로 전체*/
		display: none; /*시작할 때 숨김처리*/
		position: fixed; /*화면에 고정*/
		left: 0; /*왼쪽 0에서 시작*/
		top: 0; /*위쪽 0에서 시작*/
		z-index: 999; /*제일 위에*/
		overflow: auto; /*내용이 많으면 스크롤 생김*/
		background-color: rgba(0, 0, 0, 0.4); /*배경이 검정색에 반투명*/
		
	}
	/*모달창 내용 흰색부분*/
	.modal .modal-content{
		width: 400px;
		margin: 100px auto; /*상하 100px, 좌우 가운데*/
		padding: 0px 20px 20px 20px; /*안쪽 여백*/
		background-color: #ffffff; /*배경색 흰색*/
		border: 1px solid #888888; /*테두리 모양 색*/
	}
	/*닫기 버튼*/
	.modal .modal-content .closeBtn{
		text-align: right;
		color: #aaaaaa;
		font-size: 28px;
		font-weight: bold;
		cursor: pointer;
	}
	
	#viewModal #file{
		width: 300px;
		height: 200px;
	}
</style>
