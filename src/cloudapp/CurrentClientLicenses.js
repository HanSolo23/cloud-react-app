import React, {Component} from 'react';
import ModalForAddLicense from '../cloudapp/ModalForAddLicense';
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

class CurrentClientLicenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
        this.toggleModalWindow = this.toggleModalWindow.bind(this);
        this.toggleModalErrorWindow = this.toggleModalErrorWindow.bind(this);
        this.addLicense = this.addLicense.bind(this);
    };
    toggleModalWindow() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    // Toggle modal with error - if user will choose a service that is already present
    toggleModalErrorWindow() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    // Database update query
    addLicense(license) {
        let allClientLicenses = [];
        this.props.currentClientLicenses.forEach((item) => {
            allClientLicenses.push(item.name) 
        });
        this.props.listOfLicenses.forEach((item) => {
            if (item.name === license && allClientLicenses.indexOf(item.name) === -1 && license !== 'Выберите услугу') {
                const db = firebase.firestore();
                const usersRef = db.collection('users').doc(this.props.nameOfClient);
                usersRef.update({
                    licenses: firebase.firestore.FieldValue.arrayUnion({name: item.name, price: item.price}),
                    balance: this.props.balance - item.price,
                    'cost-per-month': this.props.costPerMonth + item.price
                });
                this.toggleModalWindow();
            }
        });
        if (allClientLicenses.indexOf(license) !== -1) {
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
                                Список лицензий
                                <CButton 
                                    size="sm" 
                                    color="dark" 
                                    onClick={this.toggleModalWindow}
                                >
                                    Добавить лицензию
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={this.props.currentClientLicenses}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <ModalForAddLicense 
                    toggleModalWindow={this.toggleModalWindow} 
                    isOpen={this.state.isOpen} 
                    listOfLicenses={this.props.listOfLicenses} 
                    addLicense={this.addLicense}
                />
                <ModalErrorSelectingServiceOrLicense 
                    toggleModalErrorWindow={this.toggleModalErrorWindow} 
                    isModalOpen={this.state.isModalOpen}
                />
            </div>
        )
    }
}

export default CurrentClientLicenses