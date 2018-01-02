import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class Boss extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=genius')
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    this.setState({data:res.data.data}) 
                }
            })
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>
                <WingBlank size="lg">
                {this.state.data.map(v=>(
                    // <WhiteSpace size="lg"></WhiteSpace>
                    v.avatar ? (
                    // <WhiteSpace  size="lg"/>
                    <Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Body>
                            {v.desc.split('\n').map(i=>(
                                <div key={i}>{i}</div>
                            ))}
                        </Body>
                    </Card> ): null
                ))}
                </WingBlank>
            </div>
        )
    }
}

export default Boss