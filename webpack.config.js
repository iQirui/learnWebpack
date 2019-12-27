const path=require("path")
modele.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        name:'bundle.js'
    }
}