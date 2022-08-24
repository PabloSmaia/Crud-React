import './Header.css'
import React from 'react'

export default props => 
    <header className="header d-done d-sm-flex">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p></p>
        <p className="leade text-muted">{props.subtitle} </p>
    </header>