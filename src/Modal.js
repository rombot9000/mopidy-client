import React from "react";
import "./Modal.css"

class Modal extends React.Component {
    render(){
        let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} onClick={this.props.handleClose}>
                <section className="modal-main">
                    {this.props.children}
                </section>
            </div>
        );
    }
};

export default Modal;