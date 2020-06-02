import React from 'react';
import {Button, ButtonGroup, Col, Dropdown,} from 'react-bootstrap';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import './Components.css';
import Annonce from './Annonce.js';
import NumberFormat from 'react-number-format';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      value: 100000,
      annonces: [],
      nombrePieces: 1
    }
  }

  componentDidMount() {
    this.getAnnonce();
    console.log(this.props.agence)
  }

  onSliderChange = value => {
    this.setState(
      {
        value
      },
      () => {
        console.log(this.state.value);
      }
      
    );
    if (value === 1000) {
      document.getElementById("plus").style.display = "block";
    }
    else {
      document.getElementById("plus").style.display = "none";
    }
  };

  getAnnonce = () => {
    fetch(`/api/annonces?id=${this.props.agence}`)
    .then(res => res.json())
    .then(list => {
      console.log(list)
      if (list.length > 0) {
        this.setState({ annonces: list })
      } else {
        alert("Erreur")
      }
    })
  }

  getAnnonceSearch = () => {
    fetch(`/api/annoncessearch?id=${this.props.agence}&pieces=${this.state.nombrePieces}&prix=${this.state.value}`)
    .then(res => res.json())
    .then(list => {
      console.log(list)
      if (list.length > 0) {
        this.setState({ annonces: list })
      } else {
        alert("Erreur")
      }
    })
  }

  handleChange= (e) => {
    this.setState({ nombrePieces: e.target.value })
    console.log(this.state.nombrePieces)
  }

render (){
  const { annonces } = this.state;
  return (
  <>
  <div>
  <div className="center_element">
  <div className="searchbar"> 
  <div className="content">
    <Col> <h3>Recherche de biens</h3>

    <div style={{ margin: 50 }}>
    <p>Prix Maximum</p>
        <div className="value_content">
        <span>{this.state.value}</span>
        <div id="plus">+</div> €
        </div>

        <div className="Slider">
        <Slider
          min={100000}
          max={1000000}
          thousandSeparator={true}
          step={25000}
          value={this.state.value}
          onChange={this.onSliderChange}
          railStyle={{
            height: 3,
          }}
          handleStyle={{
            height: 28,
            width: 28,
            marginLeft: 0,
            marginTop: -12,
            backgroundColor: "#007BFF",
            border: 0
          }}
          trackStyle={{
            background: "none"
          }}
        />
              <div className="searchbutton">
<Button onClick={() => this.getAnnonceSearch()}>Rechercher</Button>
      </div>
      </div>
      </div>


    </Col>
<div className="nb_piece">

    <span>Nombre de pièce</span>
  

  <select defaultValue={this.state.selectValue} 
 onChange={this.handleChange} 
 >
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>

</div>
</div>
</div>
</div>

  <div key={this.state.annonces} className="homeannoncecontainer">
    {annonces.map(anc =>
      <Annonce key={anc.idannonce} id={anc.idannonce} ville={anc.ville} data={anc}/>
     )}
  </div>
  </div>
</>
  );
}
}
