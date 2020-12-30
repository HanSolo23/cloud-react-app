import React, {Component} from 'react';

import {
    CCard,
    CCardBody,
    CCollapse,
    CDropdownMenu,
    CDropdownToggle,
    CNavbar,
    CNavbarNav,
    CToggler,
    CDropdown,
    CButton
  } from '@coreui/react';
import NavBarChangeUser from '../cloudapp/NavBarChangeUser';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.sendUserRole = this.sendUserRole.bind(this);
        this.logOut = this.logOut.bind(this);
    };
    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    sendUserRole(item) {
        this.props.sendUserRole(item)
    };
    logOut() {
        this.props.logOut()
    };
    render() {
        return (
            <div>
                <CCard>
                    <CCardBody>
                        <CNavbar 
                            expandable="sm" 
                            color="info" 
                            className="bg-dark" 
                            fixed={'top'}
                        >
                            <CToggler 
                                inNavbar 
                                onClick={this.handleClick}
                            />
                            <CCollapse 
                                show={this.state.isOpen} 
                                navbar
                            >
                            <CNavbarNav className="ml-auto">
                                { this.props.isOnline 
                                    ?   <CButton 
                                            color="primary" 
                                            className="px-4" 
                                            onClick={this.logOut}
                                        >
                                            Выйти
                                        </CButton> 
                                    :   <CDropdown inNav>
                                            <CDropdownToggle className="text-white">
                                                Выберите роль
                                            </CDropdownToggle>
                                            <CDropdownMenu>
                                                {this.props.role.map((item, index) => {
                                                    return <NavBarChangeUser 
                                                                key={index} 
                                                                item={item} 
                                                                sendUserRole={this.sendUserRole}
                                                            />
                                                })}
                                            </CDropdownMenu>
                                        </CDropdown>
                                }
                            </CNavbarNav>
                            </CCollapse>
                        </CNavbar>
                    </CCardBody>
                </CCard>
            </div>
        )
    }
}

export default NavBar