const express= require("express");
const path=require ('path');
const fs=require ("fs/promises");
const xfile =require ("xlsx");
const app= express();
var bigData=require('./app/controller/controllerBigData')
app.get('/api/excel', function (req,res) { 
     try {
        const xlsFile=xfile.readFile(path.join(__dirname,'testExcel.xlsx'));

        // Selecionar a primeira folha de trabalho (worksheet)
        const name = xlsFile.SheetNames[0];
        const worksheet = xlsFile.Sheets[name];
        // Converter para JSON
        const jsonData = xfile.utils.sheet_to_json(worksheet);
        const response={
            status: 200, 
            data:jsonData 
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
     } catch (error) {
        console.log(error);
     }
    
})
app.get('/api/bigData/:start_row/:end_row', function(req,res){
    const filmeXls=xfile.readFile(path.join(__dirname,'testBigDataExcel.xlsx'))
    var nameSheet=filmeXls.SheetNames[0];
    bigData.fileName= filmeXls.Sheets[nameSheet]; 

    const getEndRow=req.params.end_row
    const getStartRow=req.params.start_row
    bigData.libXls=xfile;

    
    bigData.startRow=getStartRow;
    bigData.endRow=getEndRow;
    

    const data=bigData.precessData(req,res)
})

app.listen('3050', function () { console.log('conect'); })