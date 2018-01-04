import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { List, InputItem } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            msg:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.props.getMsgList()
        // socket.on('recvmsg',(data) => {
        //     console.log('receive msg', data)
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render() {
        return (
            <div>
                chat with user:{this.props.match.params.user}
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text: v})
                            }}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        ></InputItem>
                    </List>
            </div>
            </div>
            
        )
    }
}
export default Chat