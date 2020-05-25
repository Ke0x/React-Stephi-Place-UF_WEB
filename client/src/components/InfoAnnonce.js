import React from 'react';
import '../components/Components.css';
import axios from 'axios';

export default class InfoAnnonce extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      annonce: null,
      file: '',
      filename: 'Choose File',
      uploadedFile: {},
      message: '',
      image: []
    }
  }

  componentDidMount() {
      this.getAnnonce();
      this.getImage();
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
        this.setState({ annonce: list[0] })
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

  render (){
      const { annonce } = this.state
    return(
    <>
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
    <div className="descriptionA">
        <span>{annonce && annonce.idannonce} <br/></span>
        <span>{annonce && annonce.adresse} <br/></span>
        <span>{annonce && annonce.codepostal} <br/></span>
        <span>{annonce && annonce.description} <br/></span>
        <span>{annonce && annonce.pieces} <br/></span>
        <span>{annonce && annonce.prix} <br/></span>
        <span>{annonce && annonce.superficie} <br/></span>
        <span>{annonce && annonce.ville} <br/></span>

        {this.state.image.map(anc =>
            <img key={anc.numphoto} src={anc.photo} ></img>
        )}
    </div>
    </>
    )
  }
}
