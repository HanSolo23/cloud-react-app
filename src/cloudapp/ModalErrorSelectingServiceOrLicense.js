import React, {Component} from 'react';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
  } from '@coreui/react'

class ModalErrorSelectingServiceOrLicense extends Component {
    render() {
        return (
            <div>
                <CModal 
                    show={this.props.isModalOpen} 
                    onClose={this.props.toggleModalErrorWindow}
                    size="sm"
                >
                <CModalHeader closeButton className="bg-dark">
                    <CModalTitle>Ошибка выбора услуги!</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    У Вас уже есть такая услуга!
                </CModalBody>
                <CModalFooter>
                    <CButton
                         color="primary" 
                         onClick={this.props.toggleModalErrorWindow}
                    >
                        Ок
                    </CButton>
                </CModalFooter>
            </CModal>
            </div>
        )
    }
}

export default ModalErrorSelectingServiceOrLicense