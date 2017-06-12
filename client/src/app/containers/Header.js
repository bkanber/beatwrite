import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { getSong } from "./../actions/songActions"
import { logOut } from "./../actions/userActions"

//import { NavBar } from "../components/NavBar"
//import  { NavItem } from "./../components/NavItem"
import { SongChoices } from "./../components/SongChoices"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap"
import { NavLink } from 'react-router-dom';
class Header extends React.Component {


    constructor(props) {
        super(props)
        this.handleSongSelection = this.handleSongSelection.bind(this)


    }


    handleSongSelection(event, songId) {
        this.props.getSong(songId, this.props.user.token)
    }


    render() {

        var x = document.getElementsByClassName("active")
        for(let i = 0; i < x.length; i++){
            x[i].classList.remove('active')
        }

         const currentSongId = this.props.song.id

         if(this.props.user.loggedIn){
             const mappedSongChoices = this.props.user.songs.map(song =>
                 <LinkContainer key = {"song" + song.id} to = {"/song/" + song.id}>
                     <MenuItem onClick = { (event) => this.handleSongSelection(event, song.id) } eventKey = { song.id }
                                        title={ song.title === '' ? "unnamed song" : song.title } >
                         {song.title === '' ? "unnamed song" : song.title }

                     </MenuItem>
                 </LinkContainer>

             )

             return (
                 <div className="container-fluid">
                     <Navbar className = "navbar navbar-default navbar-fixed-top" inverse collapseOnSelect>

                         <Navbar.Header>
                             <Navbar.Brand>
                             Beat Write
                             </Navbar.Brand>
                             <Navbar.Toggle />
                         </Navbar.Header>

                         <Navbar.Collapse>
                             <Nav>
                                 <LinkContainer to="/create">
                                     <NavItem eventKey={1.2}>
                                     Create Song
                                     </NavItem>
                                 </LinkContainer>
                                     <NavDropdown eventKey={3} title="Your Songs" id="basic-nav-dropdown">
                                     { mappedSongChoices }
                                     </NavDropdown>
                                 </Nav>
                                 <Nav pullRight>
                                 <NavItem onClick = { () => this.props.logOut(this.props.socket.socket) } eventKey={1} href="#">Log Out</NavItem>
                             </Nav>
                         </Navbar.Collapse>
                     </Navbar>
                 </div>
             );
         } return (
            <div className="container-fluid">
                <Navbar className = "navbar navbar-default navbar-fixed-top" inverse collapseOnSelect>

                 <Navbar.Header>
                     <Navbar.Brand>
                     Beat Write
                     </Navbar.Brand>
                     <Navbar.Toggle />
                 </Navbar.Header>

                 <Navbar.Collapse>
                 <Nav>

                 <LinkContainer to="/login">
                     <NavItem eventKey={1}>
                     Login
                     </NavItem>
                 </LinkContainer>


                 <LinkContainer to="/register">
                     <NavItem eventKey={1.1}>
                     Register
                     </NavItem>
                 </LinkContainer>


                 <LinkContainer to="/create">
                     <NavItem eventKey={1.2}>
                     Create Song
                     </NavItem>
                 </LinkContainer>

                 </Nav>
                 </Navbar.Collapse>
             </Navbar>
         </div>
         );



    }

}




const mapStateToProps = (state) =>{
    return {
        user: state.user,
        song: state.song,
        socket: state.socket

    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getSong: (songId, token) => {
            dispatch(getSong(songId, token));
        },
        logOut: (socket) =>{
            dispatch(logOut(socket))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header)