import React, {Component} from 'react';
import { post } from 'axios';

//////////Material UI/////////////
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden : {
        display : 'none'
    }
});

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        //props로 내려오는 모든 정보를 관리
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        };
    }

    // = () => --- 함수를 이용할 때 자동으로 바인딩처리 가능
    handleClickOpen = () => {
        //modal이 열린 경우
        this.setState({
            open : true
        });
    }
    // 함수를 이용할 때 자동으로 바인딩 처리를 못하도록 선언하는 경우
    // handleClickOpen () {
    //     //modal이 열린 경우
    //     this.setState({
    //         open : true
    //     });
    // }
    handleClickClose = () => {
        //모달을 닫으면 모든 변수값을 초기화
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        });
    }

    //고객 정보를 서버를 통해 db로 전송하는 함수
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
        // post(url, formData, config) 를 수행 후
            .then( response => {
                console.log(response.data);
                this.props.stateRefresh();
                //전송이 완료되면 데이터 목록을 새롭게 초기화 
            })
            
            this.setState({
                //고객 추가가 완료되면 모든 state변수를 초기화
                file : null,
                userName : '',
                birthday : '',
                gender : '',
                job : '',
                fileName : '',
                open : false
            });
    }
    addCustomer = () => {
        //입력 정보를 전송하는 부분
        const url= '/api/customers';
        const formData = new FormData();
        formData.append('image' , this.state.file);
        formData.append('name' , this.state.userName);
        formData.append('birthday' , this.state.birthday);
        formData.append('gender' , this.state.gender);
        formData.append('job' , this.state.job);
        //form 안에 입력한 모든 데이터에 대해 formData 객체에 담아 전송 준비

        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
                //form에 file이 있을 경우 header를 통해 담아 전송해준다
            }
        }

        return post(url, formData, config);
    }

    handleFileChange = (e) => {
        //선택한 이미지 중 첫 번째 것을 file로 지정하고, target 의 value를 fileName으로 지정
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        //userName, birthday, gender, job에 대한 정보를 nextState에 담아 한번에 State 변수에 저장
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/* 고객 추가 modal open button */}
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                {/* modal open 시 들어나는 세부 내용 */}
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        {/* file 형식 input을 이용하는 방법 -- hidden , accept , label 로 이어지는 이용 */}

                        {/* TextField 를 이용할 때는 label을 통해 placeholder를 표현 */}
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/> <br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    {/* modal 내용 중 동적 움직임이 일어나도록 하는 부분은 DialogAction에 선언 */}
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                            추가
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
            //     이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/> <br/>
            //     생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            //     성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            //     직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            //     <button type="submit">추가하기</button>
            // </form>
        )
    }
}
export default withStyles(styles) (CustomerAdd);