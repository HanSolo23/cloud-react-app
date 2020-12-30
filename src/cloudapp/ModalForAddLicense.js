import React, {Component} from 'react';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CDropdown,
    CSelect
  } from '@coreui/react';

class ModalForAddLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addLicense = this.addLicense.bind(this);
    };
    addLicense() {
        this.props.addLicense(this.state.change)
    };
    handleChange(event) {
        this.setState({
            change: event.target.value,
        });
    };
    render() {
        return (
            <div>
                <CModal 
                    show={this.props.isOpen} 
                    onClose={this.props.toggleModalWindow}
                    centered={true}
                >
                    <CModalHeader closeButton className="bg-dark">
                        <CModalTitle>Выберите интересующую Вас лицензию из списка</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CDropdown>
                            <CSelect onChange={this.handleChange}>
                                { this.props.listOfLicenses.map((item, index) => {
                                    return <option key={index} value={item.name}>{item.name} {item.price}</option>
                                }) }
                            </CSelect>
                        </CDropdown>
                    </CModalBody>
                    <CModalFooter>
                        <CButton 
                            color="primary" 
                            onClick={this.addLicense}
                        >
                            Ок
                        </CButton>
                        <CButton 
                            color="secondary" 
                            onClick={this.props.toggleModalWindow}
                        >
                            Отмена
                        </CButton>
                    </CModalFooter>
                </CModal>
            </div>
        )
    }
}

export default ModalForAddLicense