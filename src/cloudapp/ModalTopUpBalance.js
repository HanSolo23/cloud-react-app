import React, {Component} from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CFormGroup,
    CInput,
    CLabel,
    CSelect
  } from '@coreui/react'

class ModalTopUpBalance extends Component {
    render() {
        return (
            <div>
                <CModal 
                    show={this.props.isModalOpen} 
                    onClose={this.props.toggleModalWindow}
                    size="lg"
                >
                <CModalHeader closeButton className="bg-dark">
                    <CModalTitle>Пополнение баланса</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard>
                        <CCardHeader className="bg-dark">
                            Введите данные своей карты и сумму перевода
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Имя держателя карты</CLabel>
                                    <CInput id="name" placeholder="Enter your name" required />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="ccnumber">Номер карты</CLabel>
                                    <CInput id="ccnumber" placeholder="0000 0000 0000 0000" required />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel htmlFor="ccmonth">Месяц</CLabel>
                                        <CSelect custom name="ccmonth" id="ccmonth">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel htmlFor="ccyear">Год</CLabel>
                                        <CSelect custom name="ccyear" id="ccyear">
                                        <option>2017</option>
                                        <option>2018</option>
                                        <option>2019</option>
                                        <option>2020</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                        <option>2026</option>
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CLabel htmlFor="cvv">CVV/CVC</CLabel>
                                        <CInput id="cvv" placeholder="123" required/>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Введите сумму перевода</CLabel>
                                    <CInput id="amount" placeholder="Enter the amount" required />
                                </CFormGroup>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary">Пополнить</CButton>
                    <CButton color="secondary" onClick={this.props.toggleModalWindow}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            </div>
        )
    }
}

export default ModalTopUpBalance