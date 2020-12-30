import React, {Component} from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendLoginAndPassword = this.sendLoginAndPassword.bind(this);
    };
    handleChange({target: {value, id}}) {
        this.setState({
            [id]: value
        })
    };
    sendLoginAndPassword() {
        this.props.sendLoginAndPassword(this.state.login, this.state.password)
    };
    render() {
        return (
            <div className="c-main c-default-layout flex-row align-items-center">
                <CContainer style={{margin: '8% auto'}}>
                    <CRow className="justify-content-center">
                        <CCol md="8">
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Авторизируйтесь!</h1>
                                            <p className="text-muted">Администратор войдите в свой аккаунт</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput 
                                                    type="text" 
                                                    placeholder="Login" 
                                                    autoComplete="login" 
                                                    id="login" 
                                                    onChange={this.handleChange}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput 
                                                    type="password" 
                                                    placeholder="Password" 
                                                    autoComplete="current-password" 
                                                    id="password" 
                                                    onChange={this.handleChange}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs="6">
                                                    <CButton 
                                                    color="primary" 
                                                    className="px-4" 
                                                    onClick={this.sendLoginAndPassword}
                                                >
                                                    Войти
                                                </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

export default AdminLogin