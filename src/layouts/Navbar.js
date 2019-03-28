import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import classNames from 'classnames';

class Navbar extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            prevScrollPosition: window.pageYOffset,
            visible: true,
            icon: 'fas fa-bars'
        }
    }
    handleScroll() {
        const { prevScrollPosition: prevScroll } = this.state;

        const currentScroll = window.pageYOffset;
        const visible = currentScroll < prevScroll;
        if (this._isMounted) {
            this.setState({
                prevScrollPosition: currentScroll,
                visible,
            });
        }
    }
    handleClick() {
        if (this.refs.menu.className === 'showing') {
            this.setState({
                icon: 'fas fa-bars'
            });
        } else {
            this.setState({
                icon: 'fas fa-times'
            });
        }
        this.refs.menu.classList.toggle('showing');
    }
    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    render() {
        const { visible, icon } = this.state;
        return (
            <nav className={classNames('navbar', { hidden: !visible })}>
                <div className="menu">
                    <ul ref='menu'>
                        <li><NavLink to='/'>Cryptozone</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/news'>News</NavLink></li>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                    </ul >
                </div>
                <div className="menu-icon">
                    <i className={icon} onClick={this.handleClick.bind(this)}></i>
                </div>
            </nav >
        );
    }
}

export default Navbar;