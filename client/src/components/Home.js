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
      value: 0,
      annonces: []
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
        alert("Erreur de login")
      }
    })
  }

render (){
  const { annonces } = this.state;
  return (
  <>
  <div className="center_element">
  <div className="searchbar"> 
  <div className="content">
    <Col> <h3>Recherche de biens</h3>

    <div style={{ margin: 50 }}>
    <p>Prix Maximum</p>
        <div className="value_content">
        <NumberFormat value={this.state.value} displayType={'text'} thousandSeparator={true} />,000 
        <div id="plus">+</div> €
        </div>

        <div className="Slider">
        <Slider
          min={0}
          max={1000}
          thousandSeparator={true}
          step={25}
          value={this.state.value}
          onChange={this.onSliderChange}
          railStyle={{
            height: 3
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
<Button>Rechercher</Button>
      </div>
      </div>
      </div>


    </Col>
    

    <div className="buttonchoice">
    <ButtonGroup>
      <Button className="active">Offres</Button>
      <Button className="active">Demandes</Button>
    </ButtonGroup>
    </div>

  <Dropdown>
  <Dropdown.Toggle id="dropdown-basic">
    Type de bien
  </Dropdown.Toggle>
  

  <Dropdown.Menu>
    <Dropdown.Item id="appartement">Appartement</Dropdown.Item>
    <Dropdown.Item id="maison">Maison</Dropdown.Item>
    <Dropdown.Item id="terrain">Terrain</Dropdown.Item>
    <Dropdown.Item id="parking">Parking</Dropdown.Item>
    <Dropdown.Item id="autre">Autre</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<div className="nb_piece">
<Dropdown>
  <Dropdown.Toggle id="dropdown-basic">
    Nombre de pièce
  </Dropdown.Toggle>
  

  <Dropdown.Menu>
    <Dropdown.Item id="t1">T1</Dropdown.Item>
    <Dropdown.Item id="t2">T2</Dropdown.Item>
    <Dropdown.Item id="t3">T3</Dropdown.Item>
    <Dropdown.Item id="t4">T4</Dropdown.Item>
    <Dropdown.Item id="t5">T5</Dropdown.Item>

  </Dropdown.Menu>
</Dropdown>

</div>
</div>
</div>
</div>

  <div key={this.state.annonces} className="card-box">
    {annonces.map(anc =>
      <Annonce key={anc.idannonce} id={anc.idannonce} ville={anc.ville}/>
     )}
  </div>
</>
  );
}
}
