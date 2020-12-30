import React, {Component} from 'react';
import CurrentClientServices from '../cloudapp/CurrentClientServices';
import CurrentClientLicenses from '../cloudapp/CurrentClientLicenses';
import ModalTopUpBalance from '../cloudapp/ModalTopUpBalance';

import {
    CCard,
    CCardBody,
    CButton,
    CCol
  } from  '@coreui/react'

class ContentClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModalWindow = this.toggleModalWindow.bind(this);
    };
    toggleModalWindow() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap">
                    <CCol 
                        xs="12" 
                        sm="6" 
                        md="3"
                    >
                        <CCard className="bg-dark">
                            <CCardBody className="text-center">
                                Личный кабинет клиента: {this.props.currentClient.name}
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                        <CCard className="bg-dark">
                            <CCardBody className="d-flex flex-column text-center">
                                Баланс клиента: {this.props.currentClient.balance}
                                <CButton 
                                    color="primary" 
                                    className="mt-1" 
                                    onClick={this.toggleModalWindow}
                                >
                                    Пополнить баланс
                                </CButton>
                            </CCardBody>
                            
                        </CCard>
                    </CCol>
                </div>
                <div className="d-flex flex-wrap">
                    <CurrentClientServices 
                        currentClientServices={this.props.currentClient.services} 
                        listOfServices={this.props.listOfServices} 
                        nameOfClient={this.props.nameOfClient} 
                        balance={this.props.currentClient.balance} 
                        costPerMonth={this.props.currentClient['cost-per-month']}
                    />
                    <CurrentClientLicenses 
                        currentClientLicenses={this.props.currentClient.licenses} 
                        listOfLicenses={this.props.listOfLicenses} 
                        nameOfClient={this.props.nameOfClient} 
                        balance={this.props.currentClient.balance} 
                        costPerMonth={this.props.currentClient['cost-per-month']}
                    />
                </div>
                <ModalTopUpBalance 
                    toggleModalWindow={this.toggleModalWindow} 
                    isModalOpen={this.state.isModalOpen}
                />
            </div>
        )
    }
}

export default ContentClient