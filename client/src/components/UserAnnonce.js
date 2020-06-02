import React from 'react';
import '../components/Components.css';
import axios from 'axios';

export default class UserAnnonce extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      annonce: null,
      file: '',
      filename: 'Choose File',
      uploadedFile: {},
      message: '',
      image: [],
      annonceVille: '',
      annonceAdresse: '',
      annoncePieces: '',
      annoncePrix: '',
      annonceDescription: '',
      annonceSuperficie: '',
      annonceCodePostal: ''
    }
  }

  componentDidMount() {
      this.getAnnonce();
      this.getImage();
      console.log(this.props.match.params.id)
      console.log(this.props.match.params.userid)
  }

    onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, filePath } = res.data;

      this.setState({ uploadedFile: {fileName, filePath} })

      this.setState({message: 'File Uploaded'});
      console.log(filePath)
      this.uploadImage(this.props.match.params.id, filePath)
    } catch (err) {
      if (err.response.status === 500) {
        this.setState({message: 'There was a problem with the server'});;
      } else {
        this.setState({message: err.response.data.msg});
      }
    }
  };

   onChange = e => {
    this.setState({ file: e.target.files[0] });
    this.setState({ filename :e.target.files[0].name });
  };

  uploadImage = (id, photo) => {
    fetch(`/api/postimage?idannonce=${id}&photo=${photo}`)
    .then(res => res.json())
    .then(compte => {
      if (compte.affectedRows > 0) {
        console.log(compte)
        this.getImage()
      } else {
        alert("Erreur de login")
      }
    })
  }

  getAnnonce = () => {
    fetch(`/api/annonce?id=${this.props.match.params.id}`)
    .then(res => res.json())
    .then(list => {
      console.log(list[0])
      if (list.length > 0) {
        this.setState({ 
            annonce: list[0],
            annonceVille: list[0].ville,
            annonceAdresse: list[0].adresse,
            annoncePieces: list[0].pieces,
            annoncePrix: list[0].prix,
            annonceDescription: list[0].description,
            annonceSuperficie: list[0].superficie,
            annonceCodePostal: list[0].codepostal
        })
      } else {
        alert("Erreur")
      }
    })
  }

  getImage = () => {
    fetch(`/api/annonceimg?id=${this.props.match.params.id}`)
    .then(res => res.json())
    .then(list => {
      console.log(list)
      if (list.length > 0) {
        this.setState({ image: list })
      } else {
        console.log("Aucune photo")
      }
    })
  }

  updateannonceVille = (annonceVille) => {
    this.setState({
        annonceVille: annonceVille.target.value
    });
    console.log(annonceVille.target.value)
  }

  updateannonceAdresse = (annonceAdresse) => {
    this.setState({
        annonceAdresse: annonceAdresse.target.value
    });
    console.log(annonceAdresse.target.value)
  }

  updateannoncePieces = (annoncePieces) => {
    this.setState({
        annoncePieces: annoncePieces.target.value
    });
    console.log(annoncePieces.target.value)
  }

  updateannoncePrix = (annoncePrix) => {
    this.setState({
        annoncePrix: annoncePrix.target.value
    });
    console.log(annoncePrix.target.value)
  }

  updateannonceDescription = (annonceDescription) => {
    this.setState({
        annonceDescription: annonceDescription.target.value
    });
    console.log(annonceDescription.target.value)
  }

  updateannonceSuperficie = (annonceSuperficie) => {
    this.setState({
        annonceSuperficie: annonceSuperficie.target.value
    });
    console.log(annonceSuperficie.target.value)
  }

  updateannonceCodePostal = (annonceCodePostal) => {
    this.setState({
        annonceCodePostal: annonceCodePostal.target.value
    });
    console.log(annonceCodePostal.target.value)
  }

  saveAnnonce = () => {
    fetch(`/api/updateannonce?ville=${this.state.annonceVille}&adresse=${this.state.annonceAdresse}&pieces=${this.state.annoncePieces}&prix=${this.state.annoncePrix}&description=${this.state.annonceDescription}&superficie=${this.state.annonceSuperficie}&codepostal=${this.state.annonceCodePostal}&id=${this.props.match.params.id}`)
    .then(res => res.json())
    .then(compte => {
      if (compte.affectedRows > 0) {
        console.log(compte)
        alert("Modifications enregistrées")
        this.getAnnonce();
        this.getImage();
      } else {
        alert("Erreur")
      }
    })
  }

  render (){
      const { annonce } = this.state
    return(
    <>
    <div className="descriptionA">
        <div>
            <input type="text" className="form-control textCompte" placeholder="ville" value={this.state.annonceVille} onChange={this.updateannonceVille}></input>
            <input type="text" className="form-control textCompte" placeholder="adresse" value={this.state.annonceAdresse} onChange={this.updateannonceAdresse}></input>
            <input type="text" className="form-control textCompte" placeholder="pieces" value={this.state.annoncePieces} onChange={this.updateannoncePieces}></input>
            <input type="text" className="form-control textCompte" placeholder="prix" value={this.state.annoncePrix} onChange={this.updateannoncePrix}></input>
            <input type="text" className="form-control textCompte" placeholder="description" value={this.state.annonceDescription} onChange={this.updateannonceDescription}></input>
            <input type="text" className="form-control textCompte" placeholder="superficie" value={this.state.annonceSuperficie} onChange={this.updateannonceSuperficie}></input>
            <input type="text" className="form-control textCompte" placeholder="codepostal" value={this.state.annonceCodePostal} onChange={this.updateannonceCodePostal}></input>
            <button type="button" className="btn btn-primary" onClick={this.saveAnnonce}>Enregistrer</button>
        </div>
        {this.state.image.map(anc =>
            <img className="img" key={anc.numphoto} src={anc.photo} ></img>
        )}
                <form onSubmit={this.onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={this.onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {this.state.filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        </form>
    </div>
    </>
    )
  }
}