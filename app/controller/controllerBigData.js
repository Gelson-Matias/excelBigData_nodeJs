class controllerBigData{

    constructor (fileName,libXls,endRow,startRow){
        this.fileName=fileName;
        this.libXls=libXls;
        this.endRow=endRow;
        this.startRow=startRow;
    }

    precessData(req,res){
        try {
            let end_row=parseInt(this.endRow)-1;
            let start_row= parseInt(this.startRow) -1;
            let convertJson=this.libXls.utils.sheet_to_json(this.fileName,{
                header: [
                    "n",
                    "nome",
                    "idade",
                    "telefone"
                  ],
                range:{
                    s: { c: 1, r: start_row},  // Coluna B (índice 1) e linha 2 (índice 1)
                    e: { c: 4, r: end_row},  // Coluna E (índice 5) e linha 20 (índice 19)
                  }
                 
            });
            
            const dataJson=[
                {start_row, end_row},
                {convertJson},
                { first:convertJson[0].n,
                las:convertJson[convertJson.length -1].n,}

            ]

            console.log(this.startRow);
            console.log(this.endRow);

            let qtdRow=convertJson.length;
            res.json(dataJson)
            const qtd = JSON.stringify(convertJson)   
        } catch (error) {
            return "error 500 "+error
        }
        
    }
}
module.exports=new controllerBigData;