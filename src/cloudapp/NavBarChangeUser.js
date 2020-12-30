import React, {Component} from 'react';

import {
    CDropdownItem,
  } from '@coreui/react';

  class NavBarChangeUser extends Component {
      constructor(props) {
          super(props);
          this.sendUserRole = this.sendUserRole.bind(this);
      };
      sendUserRole() {
        this.props.sendUserRole(this.props.item)
      };
      render() {
          return (
            <CDropdownItem onClick={this.sendUserRole}>{this.props.item}</CDropdownItem>
          )
      }
  }

  export default NavBarChangeUser