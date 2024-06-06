import { useState } from "react"
import Select from "react-select";
import styled from "styled-components";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'



const Container = styled.div`
max-width: 650px;
margin: 0 auto;
padding: 20px;
background-color: rgba(255, 255, 255, 0.4);
padding: 50px;
border-radius:15px;
margin-top: 20px;
margin-bottom: 50px;

box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
`;

const Title = styled.h1`
  text-align: center;
  font-size:38px;
  color:teal;
`;

const Label = styled.label`
font-weight: 600;
  color:teal;
`;

const Input = styled.input`
width: 100%;
padding: 10px;
border: 1px solid teal;
margin-bottom: 10px;
border-radius:5px;
&:focus {
  outline: none;
}
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius:5px;
  border: 1px solid teal;
  background-color: #fff;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Selection = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid teal;
  margin-bottom: 10px;
  color: teal; /* Default text color for options */
  background-color: white;
  &:focus {
    outline: none;
  }
  option {
    color: teal;
    background-color: white;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: #fff;
  border: none;
  border-radius:25px;
  cursor: pointer;
  font-size: 15px;
  margin-top:10px;
  &:hover {
    background-color: rgb(1, 163, 163);
  }
`;

const Message = styled.div`
width:100%;
text-align:center;
font-size:16px;
margin-top:5px;`

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid teal',
    color: 'teal',
    '&:hover': {
      border: '1px solid teal',
    },
    '&:focus': {
      outline: 'none',
    },
    boxShadow: 'none',
  }),
  // placeholder: (provided) => ({
  //   ...provided,
  //   color: 'teal',
  // }),
  singleValue: (provided) => ({
    ...provided,
    color: 'teal',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'teal',
    color: 'white',
    borderRadius: '5px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: 'teal',
      color: 'white',
    },
  }),
};

const Addexchangeproduct = () => {
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')
  const [imgfile, setimgfile] = useState('')
  const [img, setimg] = useState('')
  const [preference, setprefer] = useState('')
  const [categories, setcategories] = useState()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null)
  const [exchangetype, setexchangetype] = useState('')
  const [message, setMessage] = useState('')
  // const formData=new formData(); 

  const optionList = [{ value: "Electronics", label: "Electronics" },
  { value: "Pc Components", label: "Pc Components" },
  { value: "Sports", label: "Sports" },
  { value: "Home & Living", label: "Home & Living" },
  { value: "Gadgets", label: "Gadgets" },
  { value: "Laptop", label: "Laptop" },
  { value: "Phone", label: "Phone" },
  { value: "Education", label: "Education" },
  { value: "Others", label: "Others" }
  ]

  const handleSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedValues);
  };

  const handleimage = (e) => {
    e.preventDefault()
    // const formData = new FormData()

    var fileObject = e.target.files[0];
    setimgfile(fileObject);
  }
  const handleimagesave = () => {
    const formData = new FormData()
    formData.append("file", imgfile)
    formData.append("upload_preset", "Product_image")

    axios.post(
      "https://api.cloudinary.com/v1_1/dcpremwwm/image/upload", formData)
      .then((response) => {
        console.log("for image URL", response);
        setimg(response.data.secure_url);
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('Please wait')
    //add to the backend part 
    handleimagesave()
    console.log(img)
    const user_email = user.user._id
    // formData.append("user_email",user_email)
    // formData.append("title",title)
    // formData.append("desc",desc)
    // formData.append("img",img)
    // formData.append("preference",preference)
    // formData.append("categories",categories)
    // formData.append("exchangetype", exchangetype)


    // console.log(formData)
    // console.log(formData.get(img))
    axios.post('http://localhost:3000/Addition/addexchange', //formData
      {
        user_email, title, desc, img, preference, selectedCategories, exchangetype
      }, {
      headers: {
        'Content-Type': 'application/json' //, 'Authorization': `Bearer ${user.token}`  'multipart/form-data'  
      }
    }
    ).then((response) => {
      console.log(response)
      setTitle('')
      setdesc('')
      setprefer('')
      setimg('')
      setError(null)
      setcategories('')
      setexchangetype('')
      setimgfile('')
      if (response.statusText === 'OK') { setMessage('Product added successfully!') }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        setMessage("server responded");
      } else if (error.request) {
        setMessage("network error");
      } else {
        console.log(error);
      }
    })

  }

  return (
    <Container>
      <form className="exchange" onSubmit={handleSubmit} encType='multipart/form-data'>
        <Title>Add a New Product For Exchange</Title>

        <Label>Product Title</Label>
        <Input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        // className={emptyFields.includes('title') ? 'error' : ''}
        />
        <Label>Description</Label>

        <Input
          type="text"
          onChange={(e) => setdesc(e.target.value)}
          value={desc}
          required
        // className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <Label>Preference</Label>
        <Input
          type="text"
          onChange={(e) => setprefer(e.target.value)}
          value={preference}
          required
        // className={emptyFields.includes('load') ? 'error' : ''}
        />
        <Label>Exchange Type</Label>
        <Selection value={exchangetype} onChange={e => setexchangetype(e.target.value)}>
          <option>Choose</option>
          <option value="Tempory">Temporary</option>
          <option value="Paramanent">Parmanent</option>
        </Selection>



        <Label>Image</Label>
        <FileInput
          type="file"
          name="photos"
          onChange={handleimage}
          className="form-control-file"
          multiple
        // className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <Label>Catagory</Label>
        <div className="dropdown-container">
          <Select
            options={optionList}
            placeholder="Select category"
            onChange={handleSelect}
            value={optionList.filter((option) =>
              selectedCategories.includes(option.value)
            )}
            isSearchable={true}
            isMulti
            styles={customStyles}
          />
        </div>

        {message && <Message>{message}</Message>}
        <SubmitButton>Add Product</SubmitButton>
        {error && <div className="error">{error}</div>}
      </form>
    </Container>
  )
}
export default Addexchangeproduct