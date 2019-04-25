import React, {Component} from 'react';
import CustomerDelete from './CustomerDelete';

//////////Material UI/////////////
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Customer extends Component {
    //Customer 목록을 Table에 담아 render하는 component
    constructor(props){
        super(props);
        this.setState({

        });
    }
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.img} alt="profile-img"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /> </TableCell>
            </TableRow>
        )
    }
}


export default Customer;