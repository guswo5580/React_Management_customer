import React, {Component} from 'react';

//////////Material UI/////////////
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends Component {
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
        this.setState({
            open : false
        });
    }

    deleteCustomer = (id) => {
        const url = '/api/customers/' + id;
        fetch(url, {
            method : 'DELETE'
            //REST API 의 delete 메소드를 전송
        });
        this.props.stateRefresh();
    }

    render(){
        return (
            // <button onClick={this.deleteCustomer(this.props.id)}>삭제</button>
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
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
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        )
    }
}

export default CustomerDelete;