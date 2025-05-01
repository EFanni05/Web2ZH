const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const data = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jane Doe"},
    {id: 3, name: "Jim Doe"}
]
//all get
app.get('/', (req, res) => {
    res.status(200).json(data);
})

//get specific data
app.get('/:id', (req, res) => {
    let id = req.params.id;
    if(id == undefined || id == null || id == ""){
        res.status(400).json({msg: "Id is required"});
    }
    else if(isNaN(id)){
        res.status(400).json({msg: "Id must be a number"});
    }
    else{
        if(data.find(x => x.id === id)){
            res.status(200).json(data.find(x => x.id === id));
        }
        else{
            res.status(404).json({msg: "Item with the id was not found"});
        }
    }
})

//post data
app.post('/', (req, res) => {
    let name = req.body.name;
    if(name == undefined || name == null || name == ""){
        res.status(400).json({msg: "Name is required"});
    }
    else{
        let id = data.length + 1;
        data.push({id, name});
        res.status(201).json(data.find(x => x.id === id), {msg : "Item created succesfully"});
    }
})

//put data
app.put('/update/:id', (req, res) => {
  if(req.params.id == undefined || req.params.id == null || req.params.id == ""){
    res.status(400).json({msg: "Id is required"});
  }
  else if(isNaN(req.params.id)){
    res.status(400).json({msg: "Id must be a number"});
  }
  else{
    let id = req.params.id;
    let name = req.body.name;
    if(name == undefined || name == null || name == ""){
        res.status(400).json({msg: "Name is required"});
    }
    else{
        if(data.find(x => x.id === id)){
            data[data.findIndex(x => x.id === id)].name = name;
            res.status(200).json(data.find(x => x.id === id), {msg : "Item updated succesfully"});
        }
        else{
            res.status(404).json({msg: "Item with the id was not found"});
        }
    }
  }
})


//delete data
app.delete('/delete/:id', (req, res) => {
    if(req.params.id == undefined || req.params.id == null || req.params.id == ""){
        res.status(400).json({msg: "Id is required"});
    }
    else if(isNaN(req.params.id)){
        res.status(400).json({msg: "Id must be a number"});
    }
    else{
        let id = req.params.id;
        if(data.find(x => x.id === id)){
            data.splice(data.findIndex(x => x.id === id), 1);
            res.status(200).json({msg : "Item deleted succesfully"});
        }
        else{
            res.status(404).json({msg: "Item with the id was not found"});
        }
    }
});

app.listen(port, () => {
    console.log(`Fanni's ZH is running on localhost:${port}`);
});