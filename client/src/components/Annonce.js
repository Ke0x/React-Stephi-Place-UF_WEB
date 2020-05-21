import React from 'react';
import '../components/Components.css';
import {Button, Card,} from 'react-bootstrap';


export default class Annonce extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      
    }
  }

render (){
  return (
    <Card className="Card">
        <Card.Img variant="top" src="" />
        <Card.Body>
        <Card.Title>{this.props.id}</Card.Title>
        <Card.Text>
        {this.props.ville}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
  );
}
}
