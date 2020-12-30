import React, {Component} from 'react';
import NavBar from '../cloudapp/NavBar';
import ContentAdmin from './ContentAdmin';
import ContentClient from './ContentClient';
import AdminLogin from '../cloudapp/AdminLogin';
import ClientLogin from '../cloudapp/ClientLogin';
import ModalErrorLogin from './ModalErrorLogin';
import Footer from '../cloudapp/Footer';
import firebase from 'firebase';

import {
    CCard,
    CCardBody,
    CCol
  } from  '@coreui/react';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientData: [],
            roleData: [],
            listOfServices: [],
            listOfLicenses: [],
            arrWithAdminLogins: [],
            arrWithAdminPasswords: [],
            arrWithClientLogins: [],
            arrWithClientPasswords: [],
            arrWithMonthCost: [],
            role: '',
            login: '',
            password: '',
            isOnline: false,
            isModalOpen: false
        };
        this.saveUserRole = this.saveUserRole.bind(this);
        this.saveAdminLoginAndPassword = this.saveAdminLoginAndPassword.bind(this);
        this.saveClientLoginAndPassword = this.saveClientLoginAndPassword.bind(this);
        this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
        this.logOut = this.logOut.bind(this);
        this.toggleModaErrorlWindow = this.toggleModaErrorlWindow.bind(this);
    };
    componentDidMount() {
        // Database queries
        const db = firebase.firestore();
        const roleRef = db.collection('users').doc('role');
        roleRef.get().then((doc) => {
            this.setState({
                roleData: doc.data().role
            })
        }).catch(function(error) {
            console.log(error)
        });
        const adminsRef = db.collection('users').doc('admins');
        adminsRef.get().then((doc) => {
            this.setState({
                arrWithAdminLogins: doc.data().admins.map((item) => item.login),
                arrWithAdminPasswords: doc.data().admins.map((item) => item.password)
            })
        }).catch(function(error) {
            console.log(error)
        });
        const clientsRef = db.collection('users').where("isClient", "==", true);
        clientsRef.onSnapshot((querySnapshot) => {
            let clientData = [];
            let clientLogins = [];
            let clientPasswords = [];
            let costPerMonth = [];
            querySnapshot.forEach((doc) => {
                clientData.push(doc.data());
                clientLogins.push(doc.data().login);
                clientPasswords.push(doc.data().password);
                costPerMonth.push(doc.data()['cost-per-month'])
            });
            this.setState({
                clientData,
                arrWithClientLogins: clientLogins,
                arrWithClientPasswords: clientPasswords,
                arrWithMonthCost: costPerMonth
            })
        });
        const servicesRef = db.collection('users').doc('services');
        servicesRef.get().then((doc) => {
            this.setState({
                listOfServices: doc.data().services
            })
        }).catch(function(error) {
            console.log(error)
        });
        const licensesRef = db.collection('users').doc('licenses');
        licensesRef.get().then((doc) => {
            this.setState({
                listOfLicenses: doc.data().licenses
            })
        }).catch(function(error) {
            console.log(error)
        });
        // Data extraction from local storage
        const login = localStorage.getItem('login');
        const password = localStorage.getItem('password');
        const isOnline = localStorage.getItem('isOnline') === 'true';
        this.setState({
            login,
            password,
            isOnline
        })
    };
    saveUserRole(item) {
        this.setState({
            role: item
        });
    };
    // Save logins and passwords in locale storage so that user remains in the system when the page is reloaded
    saveAdminLoginAndPassword(login, password) {
        if( this.state.arrWithAdminLogins.indexOf(login) !== -1 && this.state.arrWithAdminPasswords.indexOf(password) !== -1 ) {
            this.setState({
                login,
                password,
                isOnline: true,
                role: ''
            }, () => this.saveInLocalStorage());
            localStorage.setItem('login', login);
            localStorage.setItem('password', password);
        } else {
            this.toggleModaErrorlWindow();
        }
    };
    saveClientLoginAndPassword(login, password) {
        if( this.state.arrWithClientLogins.indexOf(login) !== -1 && this.state.arrWithClientPasswords.indexOf(password) !== -1 ) {
            this.setState({
                login,
                password,
                isOnline: true,
                role: ''
            }, () => this.saveInLocalStorage());
            localStorage.setItem('login', login);
            localStorage.setItem('password', password);
            localStorage.setItem('isOnline', this.state.isOnline);
        } else {
            this.toggleModaErrorlWindow();
        }
    };
    saveInLocalStorage() {
        localStorage.setItem('isOnline', this.state.isOnline);
    };
    // Toggle modal with error of authorisation if login or password are not in the data base
    toggleModaErrorlWindow() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    logOut() {
        this.setState({
            login: '',
            password: '',
            isOnline: false,
            role: ''
        })
        localStorage.clear();
    };
    render() {
        // Conditions for displaying different pages in app(login windows, admin and client accounts if this admin or client is in data base, welcome page)
        let loginPage;
        if ( this.state.role === 'Admin' ) {
            loginPage = <AdminLogin sendLoginAndPassword={this.saveAdminLoginAndPassword}/>
        } else if( this.state.role === 'Client' ) {
            loginPage = <ClientLogin sendLoginAndPassword={this.saveClientLoginAndPassword}/>
        };
        let contentPage;
        if ( this.state.arrWithAdminLogins.indexOf(this.state.login) !== -1 && this.state.arrWithAdminPasswords.indexOf(this.state.password) !== -1 ) {
            contentPage =   <div>
                                <ContentAdmin 
                                    data={this.state.clientData} 
                                    arrWithMonthCost={this.state.arrWithMonthCost}
                                />
                            </div> 
        } else if ( this.state.arrWithClientLogins.indexOf(this.state.login) !== -1 && this.state.arrWithClientPasswords.indexOf(this.state.password) !== -1 ) {
            contentPage =   <div>
                                { this.state.clientData.map((item, index) => {
                                    if (this.state.login === item.login) {
                                        return <ContentClient 
                                                    key={index} 
                                                    currentClient={item} 
                                                    listOfServices={this.state.listOfServices} 
                                                    listOfLicenses={this.state.listOfLicenses} 
                                                    nameOfClient={this.state.login}
                                                />
                                    }
                                })}
                            </div> 
        }; 
        let welcomePage;
        if ( !this.state.isOnline && this.state.role === '' ) {
            welcomePage =   <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CCol 
                                    xs="12" 
                                    sm="10" 
                                    md="5" 
                                    style={{fontSize: '20px', margin: '8% auto'}}
                                >
                                    <CCard className="bg-info">
                                        <CCardBody>
                                            Добро пожаловать в наш облачный сервис. 
                                            Здесь вы сможете арендовать микросервисы и специальные лицензии на клиентские подключения к ним. 
                                            Выберите роль в правом верхнем углу, затем авторизируйтесь.
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </div>
        };
        return (
            <div>
                <NavBar 
                    sendUserRole={this.saveUserRole} 
                    role={this.state.roleData} 
                    isOnline={this.state.isOnline} 
                    logOut={this.logOut}
                />
                { loginPage }
                { contentPage }
                { welcomePage }
                <ModalErrorLogin 
                    toggleModaErrorlWindow={this.toggleModaErrorlWindow}
                    isModalOpen={this.state.isModalOpen}
                />
                <Footer/>
            </div>
        )
    }
}

export default MainPage
