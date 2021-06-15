import ReactDOM from "react-dom";
import "./styles.css";

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-box">
        <button className="close" onClick = {props.handleModal}> X</button>
        <figure>
          <img src={props.img} alt={props.image}></img>
        </figure>
        <p>
          pokemon número: <strong>{props.id}</strong>{" "}
        </p>
        <h3>{props.name}</h3>
        <p>
          Tipo: <strong>{props.type}</strong>{" "}
        </p>
        <p>
          Abilidad: <strong>{props.ability}</strong>{" "}
        </p>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
