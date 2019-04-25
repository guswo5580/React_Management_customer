import React, {Component} from 'react';

//////////Material UI/////////////
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends Component {
    //고객 정보를 삭제하는 컴포넌트 
    constructor(props){
        super(props);
        this.state = {
            open : false
        }
    }
    handleClickOpen = () => {
        //modal이 열린 경우
        this.setState({
            open : true
        });
    }
    handleClickClose = () => {
        //modal이 닫힌 경우
        this.setState({
            open : false
        });
    }

    deleteCustomer = (id) => {
        //서버에 삭제 신호를 주는 과정
        const url = '/api/customers/' + id;
        //id = params 값으로 전송
        fetch(url, {
            //fetch를 이용하여 전송할 경우, method를 통해 명령을 전달시켜주어야 함
            //axios 를 이용하는 것으로... 
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    render(){
        return (
            // <button onClick={this.deleteCustomer(this.props.id)}>삭제</button>
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                {/* 삭제 여부에 대한 재확인 모달 이용 */}
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>
                        삭제하시겠습니까?
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.deleteCustomer(this.props.id)}>삭제</Button>
                        {/* props로 전달되는 id를 이용 */}
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        )
    }
}

export default CustomerDelete;