import React, { Component } from "react";
import Main from "../template/Main";
import axios from 'axios'


const headerProps = {
    icon: 'users',
    title: 'Usuario',
    subtitle: 'Cadastro de usuario: Incluir, Lista, Alterar e excluir'
}

const baseUrl = 'http://localhost:3002/users'

const initialState = {
    user: { user: '', email: '' },
    list: []
}


export default class UserCrud extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }


    save() {

        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })

            })
    }

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return (list)
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div class="form-group">
                            <label for="">Nome</label>
                            <input type="text" class="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome.." />

                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div class="form-group">
                            <label for="">Email</label>
                            <input type="text" class="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o email.." />

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            cancelar
                        </button>


                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdateList(null)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }

renderRow(){
    return this.state.list.map(user =>{
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button className="btn btn-warning"
                    onClick={()=>this.load(user)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger ml-2" 
                     onClick={()=>this.remove(user)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>

            </tr>
        )
    })
}    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
                
            </Main>
        )
    }

}