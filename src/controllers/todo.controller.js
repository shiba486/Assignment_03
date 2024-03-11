const Todo = require("../models/todo.model")

//create Todo
exports.createTodo = async function(req,res){
    try {
        const data = req.body;
        const createTodo = new Todo(data);
        const response = await createTodo.save();
        if (!response) {
            res.status(404).json({ message: "todo not found" });
          }
        res.status(200).json({message: "ok", error: "todo create successfully", data: response});
    } catch (error) {
        res.status(200).json({message: "sorry", error: "todo create error"});
        console.log(error)
    }
}

//show Todo
exports.showTodo = async function(req,res){
    try {
        const email = req.headers["email"]
        const showTodo =await Todo.findOne({email:email})
        if (!showTodo) {
            res.status(404).json({ message: "todo not found" });
          }
        res.status(200).json({message: "ok", error: "todo show successfully", data: showTodo});
    } catch (error) {
        res.status(200).json({message: "sorry", error: "todo see error"});
        console.log(error)
    }
}

//update Todo
exports.updateTodo = async function(req,res){
    try {
        const todoId = req.params.id
        const email = req.headers["email"]
        const data = req.body;
        // const updateTodo =await Todo.findByIdAndUpdate(todoId, data)
        const updateTodo = await Todo.updateOne({_id: todoId, email: email},data)
        if (!updateTodo) {
            res.status(404).json({ message: "todo not updated" });
          }
     
        res.status(200).json({message: "ok", error: "todo update successfully", data: updateTodo});
    } catch (error) {
        res.status(200).json({message: "sorry", error: "todo update error"});
        console.log(error)
    }
}

//update status Todo
exports.updateTodoStatus = async function(req,res){
    try {
        let todoId = req.params.id
        let email = req.headers["email"]
        let todoStatus = req.body["status"]
        
        const Postbody = {
            status: todoStatus,
        }

        const updateTodoStatus = await Todo.updateOne({_id: todoId, email: email},{$set: Postbody}, {upsert: true})
        if (!updateTodoStatus) { 
            res.status(404).json({ message: "todo not updated" });
          }

        res.status(200).json({message: "ok", error: "todo update successfully", data: updateTodoStatus});
    } catch (error) {
        res.status(200).json({message: "sorry", error: "todo update error"});
        console.log(error)
    }
}

//delete Todo
exports.deleteTodo = async function(req,res){
    try {
        
        const todoId = req.params.id
        const email = req.headers["email"];
        // const deleteTodo = await Todo.findByIdAndDelete(todoId)
        const deleteTodo = await Todo.deleteOne({_id: todoId, email: email})
        if (!deleteTodo) {
            res.status(404).json({ message: "delete unsuccessfull" });
          }
        res.status(200).json({message: "ok", error: "todo delete successfully", data: deleteTodo});
    } catch (error) {
        res.status(200).json({message: "sorry", error: "todo delete error"});
        console.log(error)
    }
}


