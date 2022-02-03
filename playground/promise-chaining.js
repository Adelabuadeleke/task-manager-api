require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5f2f1fe30f6f7f0c88ed53cd',{ age:1 }).then((user)=>{
//   console.log(user)
//   return User.countDocuments({age:1})
// }).then((result)=> {
//   console.log(result)
// }).catch((e)=>{
//   console.log(e)
// }) 

const updateAgeAndCount = async(id, age) => {
  const user = await User.findByIdAndUpdate(id,{ age: age })
  const count = await User.countDocuments({ age: age })
  return count

}

updateAgeAndCount('5f2f1fe30f6f7f0c88ed53cd', 2).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})