import React from "react";
import {Icon, Link, Navbar, NavLeft, NavRight} from "framework7-react";

/**
 * This Shell Navbar
 */
export default class ShellNavbar extends React.Component {
    displayName = this.__proto__.constructor.name;
    navbar = {
        title:    'Problem Resolver',
        subtitle: 'Application for solving problems in a structured way',
    };
    
    
    constructor(props) {
        super(props);
        
        this.app = this.$f7;
    }
    
    render() {
        // this.props.app.logger.log({app: this.app});
        
        return (
            <React.Fragment>
                <Navbar title={this.navbar.title} subtitle={this.navbar.subtitle}>
                    <NavLeft slot="nav-left">
                        {this.app.displayable('panelLeft') &&
                        <Link color="black" panelOpen="left">
                            <Icon icon="fad fa-arrow-alt-from-left"/>
                        </Link>}
                    </NavLeft>
                    
                    <NavRight slot="nav-right">
                        
                        {this.app.displayable('buttonInstall') &&
                        <Link color="black" onClick={this.app.event.installApp}>
                            <Icon classname="no-link icon-only" icon={`fad fa-phone-laptop`}/>
                        </Link>}
                        
                        {!this.app.online && <Link color="black">
                            <Icon classname="no-link icon-only"
                                  icon={`fad fa-wifi${this.app.online ? '' : '-slash'}`}/>
                        </Link>}
                        
                        {!this.app.displayable('panelRight') &&
                        <Link color="black" icon="fad fa-arrow-to-left" panelOpen="right"/>}
                    </NavRight>
                </Navbar>
            </React.Fragment>
        );
    }
}