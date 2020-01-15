import React from "react";
import "./Modal.css"

class Modal extends React.Component {
    render(){
        console.log(this.props.show);
        let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    {this.props.children}
                    <button onClick={this.props.handleClose}>close</button>
                </section>
            </div>
        );
    }
};

export default Modal;