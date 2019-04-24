import react, {Component} from 'react';

class CustomerDelete extends Component {
    
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
            // eslint-disable-next-line react/react-in-jsx-scope
            <button onClick={this.deleteCustomer(this.props.id)}>삭제</button>
        )
    }
}

export default CustomerDelete;