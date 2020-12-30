import React, {Component} from 'react';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
  } from '@coreui/react'

class ModalErrorLogin extends Component {
    render() {
        return (
            <div>
                <CModal 
                    show={this.props.isModalOpen} 
                    onClose={this.props.toggleModaErrorlWindow}
                    size="sm"
                >
                <CModalHeader closeButton className="bg-dark">
                    <CModalTitle>Ошибка авторизации!</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Такого пользователя не существует! Проверьте правильность ввода логина или пароля.
                </CModalBody>
                <CModalFooter>
                    <CButton 
                        color="primary" 
                        onClick={this.props.toggleModaErrorlWindow}
                    >
                        Ок
                    </CButton>
                </CModalFooter>
            </CModal>
            </div>
        )
    }
}

export default ModalErrorLogin