import ReactDOM from "react-dom";
import "./styles.css";

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-box">
        <button className="modal-close" onClick={props.handleModal}>
          {" "}
          X
        </button>
        <figure className="modal-image">
          <img src={props.img} alt={props.image}></img>
        </figure>
        <div className="modal-title">
          <h3>{props.name}</h3>
        </div>
        <div className="modal-content">
          <p>
            Tipo: <strong>{props.type}</strong>{" "}
          </p>
          <p>
            Abilidad: <strong>{props.ability}</strong>{" "}
          </p>
          <p>
            pokemon número: <strong>{props.id}</strong>{" "}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
