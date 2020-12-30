import React, {Component} from 'react';

import { CFooter } from '@coreui/react';

class Footer extends Component {
    render() {
        return (
            <div>
                <CFooter 
                    fixed={true} 
                    className="bg-dark text-white"
                >
                    <div className="mfs-auto">
                        <span className="mr-1">Powered by</span>
                        <a 
                            href="https://coreui.io/react" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            CoreUI for React
                        </a>
                    </div>
                </CFooter>
            </div>
        )
    }
}

export default Footer