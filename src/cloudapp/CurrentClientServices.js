import React, {Component} from 'react';
import ModalForAddService from '../cloudapp/ModalForAddService';
import ModalErrorSelectingServiceOrLicense from './ModalErrorSelectingServiceOrLicense';
import firebase from 'firebase';

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CButton,
    CRow
  } from '@coreui/react';

const fields = ['name','price'];

class CurrentClientServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isModalErrorOpen: false
        }
        this.toggleModalWindow = this.toggleModalWindow.bind(this);
        this.toggleModalErrorWindow = this.toggleModalErrorWindow.bind(this);
        this.addService = this.addService.bind(this);
    };
    toggleModalWindow() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    // Toggle modal with error - if user will choose a license that is already present
    toggleModalErrorWindow() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    // Database update query
    addService(service) {
        let allClientServices = [];
        this.props.currentClientServices.forEach((item) => {
            allClientServices.push(item.name)
        })
        this.props.listOfServices.forEach((item) => {
            if (item.name === service && allClientServices.indexOf(item.name) === -1 && service !== 'Выберите услугу') {
                const db = firebase.firestore();
                const usersRef = db.collection('users').doc(this.props.nameOfClient);
                usersRef.update({
                    services: firebase.firestore.FieldValue.arrayUnion({name: item.name, price: item.price}),
                    balance: this.props.balance - item.price,
                    'cost-per-month': this.props.costPerMonth + item.price
                });
                this.toggleModalWindow();
            } 
        });
        if (allClientServices.indexOf(service) !== -1) {
            this.toggleModalErrorWindow()
        }
    };
    render() {
        return (
            <div className="flex-fill">
                <CRow>
                    <CCol 
                        xs="12" 
                        lg="10"  
                        style={{margin: '8% auto'}}
                    >
                        <CCard className="bg-gradient-light">
                            <CCardHeader className="text-body d-flex justify-content-between" >
                                Список сервисов
                                <CButton 
                                    size="sm" 
                                    color="dark" 
                                    onClick={this.toggleModalWindow}
                                >
                                    Добавить сервис
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={this.props.currentClientServices}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <ModalForAddService 
                    toggleModalWindow={this.toggleModalWindow} 
                    isOpen={this.state.isOpen} 
                    listOfServices={this.props.listOfServices} 
                    addService={this.addService}
                />
                <ModalErrorSelectingServiceOrLicense 
                    toggleModalErrorWindow={this.toggleModalErrorWindow} 
                    isModalOpen={this.state.isModalOpen}
                />
            </div>
        )
    }
}

export default CurrentClientServices