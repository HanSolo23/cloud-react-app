import React, {Component} from 'react';

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CButton,
    CCollapse,
    CRow
  } from '@coreui/react';

const fields = ['name','cost-per-month', 'show_details'];

class ContentAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
        }
        this.toggleDetails = this.toggleDetails.bind(this);
    };
    toggleDetails(index) {
        const position = this.state.details.indexOf(index);
        let newDetails = this.state.details.slice();
        if (position !== -1) {
          newDetails.splice(position, 1);
        } else {
          newDetails = [index];
        }
        this.setState({
            details: newDetails
        })
    };
    render() {
        return(
            <div>
                <CRow>
                    <CCol 
                        xs="12" 
                        lg="6" 
                        style={{margin: '8% auto'}}
                    >
                        <CCard className="bg-gradient-light">
                            <CCardHeader className="text-body">
                                Список клиентов
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={this.props.data}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                    scopedSlots={{
                                        'show_details':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2">
                                                        <CButton
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => { this.toggleDetails(index) }}
                                                        >
                                                            {this.state.details.includes(index) ? 'Hide' : 'Show'}
                                                        </CButton>
                                                    </td>
                                                )
                                            },
                                        'details':
                                            (item, index)=>{
                                            return (
                                            <CCollapse show={this.state.details.includes(index)}>
                                                <CCardBody style={{backgroundColor: 'rgba(46, 178, 240, 0.575)'}}>
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{marginRight: '100px'}}>
                                                            <h6>
                                                                Сервисы:
                                                            </h6>
                                                            {item.services.map((item, index) => {
                                                                return <div key={index} style={{fontSize: '18px'}}>{item.name}</div>
                                                            })}
                                                        </div>
                                                        <div>
                                                            <h6>
                                                                Лицензии:
                                                            </h6>
                                                            {item.licenses.map((item, index) => {
                                                                return <div key={index} style={{fontSize: '18px'}}>{item.name}</div>
                                                            })}
                                                        </div> 
                                                    </div>
                                                </CCardBody>
                                            </CCollapse>
                                            )
                                        }    
                                    }}
                                />
                            </CCardBody>
                            <CCardBody style={{position: 'relative', top: '0', left: '27%'}} className="text-body">
                                <div>
                                    <div style={{fontWeight: 'bolder'}}>
                                        Total cost per month:
                                    </div>
                                    <div>
                                        {this.props.arrWithMonthCost.reduce((sum, current) => sum + current, 0)}
                                    </div>
                                </div>
                            </CCardBody>
                        </CCard>
                        
                    </CCol>
                </CRow>
            </div>
        )
    }
}

export default ContentAdmin