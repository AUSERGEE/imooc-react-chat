import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register} from '../../redux/user.redux'

@connect(
    state => state.user,
    { register }
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genuis'
        }
        this.handelRegister = this.handelRegister.bind(this)
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    handelRegister() {
        this.props.register(this.state)
        console.log(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>this.handleChange('user',v)}
                        >用户名</InputItem>
                        <InputItem 
                            type='password'
                            onChange={v=>this.handleChange('pwd',v)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.handleChange('repeatpwd',v)}
                        >确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem 
                            checked={this.state.type === 'genuis'}
                            onChange={()=>this.handleChange('type','genuis')}
                        >牛人</RadioItem>
                        <RadioItem 
                            checked={this.state.type === 'boss'}
                            onChange={()=>this.handleChange('type','boss')}
                        >boss</RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handelRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

 export default Register