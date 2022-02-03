require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5f31baf45421621c3882471f').then((task)=> {
  console.log(task)
  return Task.countDocuments({ completed:false })
}).then((result) => {
  console.log(result)
}).catch((e)=>{
  console.log(e)
})

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed:false })
  return count
}

deleteTaskAndCount('5f31b882fca03a22743427ce').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})