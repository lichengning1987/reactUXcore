require('./PageDemo.less');

const reactMixin = require('react-mixin');

const i18n = require('i18n');

const Actions = require('./actions');
const Store = require('./store');

const { Table } = Uxcore;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [1, 2, 3],
        };
        this.addItemFromBottom = this.addItemFromBottom.bind(this);
        this.addItemFromTop = this.addItemFromTop.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItemFromBottom() {
        this.setState({
            list: this.state.list.concat([4]),
        });
    }

    addItemFromTop() {
        this.setState({
            list: [0].concat(this.state.list),
        });
    }

    deleteItem() {
        const newList = [...this.state.list];
        newList.pop();
        this.setState({
            list: newList,
        });
    }

    render() {
        return (
            <div>
                {this.state.list.map((item) => <div>{item}</div>)}
                <button onClick={this.addItemFromBottom}>尾部插入 Dom 元素</button>
                <button onClick={this.addItemFromTop}>头部插入 Dom 元素</button>
                <button onClick={this.deleteItem}>删除 Dom 元素</button>
            </div>
        );
    }
}

class Person extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }

    componentWillMount() {
        console.log('即将诞生')
    }

    componentDidMount() {
        console.log('诞生完毕')
    }

    componentWillReceiveProps(nextProps) {
        console.log('接受到新的 props')
        this.setState({
            name: nextProps.name
        }, () => {
            console.log('state 修改完毕')
    })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.name !== this.state.name
    }

    componentWillUpdate() {
        console.log('即将更新视图')
    }

    componentDidUpdate(){
        console.log('视图更新完毕')
    }

    componentWillUnmount(){
        console.log('卸载')
    }

    render() {
        return (
            <div>
                 my name is {this.state.name}
            </div>
    )
    }
}



class PageDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            content: {},
            error: false,
            name: 'react'
        };
    }

    componentDidMount() {
        Actions.fetch({
            workNo: '0001'
        }, function(data) {
            console.log(data);
        });
    }

    render() {
        let renderCell = (cellData, rowData) => {
            return <span>{cellData}</span>
        };
        let tableProps = {
            width: 600,
            jsxdata: {
                data: this.state.content.list
            },
            jsxcolumns: [
                {dataKey: 'workNo', title: '工号', width: 300, render: renderCell},
                {dataKey: 'name', title: '姓名', width: 300, render: renderCell},
                {dataKey: 'nickName', title: '昵称', width: 300, render: renderCell}
            ]
        };
        return (
            <div className="page-demo">
                <Demo/>
                <h1>UXCore Starter Kit123</h1>
                <Table {...tableProps} />
                <h1>{i18n('i18n')}</h1>
                <div><Person name={this.state.name} /></div>

                <p>{i18n('changeServer')}</p>
                <h1>DOCS</h1>
                <ul>
                    <li>UXCore: <a href="http://uxco.re">http://uxco.re</a></li>
                    <li>Nowa: <a href="http://nowa-webpack.github.io/web/index.html?en">http://nowa-webpack.github.io</a></li>
                </ul>
                <h1>LINKS</h1>
                <ul>
                    <li>Form: <a href="/form.html">Form Demo</a></li>
                    <li>Table: <a href="/table.html">Table Demo</a></li>
                </ul>
            </div>
        );
    }
}

reactMixin.onClass(PageDemo, Reflux.connect(Store));

ReactDOM.render(<PageDemo/>, document.getElementById('App'));

module.exports = PageDemo;
