import {createServer} from "http"
import { writeFile } from 'node:fs';

let controllers=[
    {
        name:"sum",
        func: function (request,response){
            let items =request.url.split("/")
            response.writeHead(200)
            response.write((Number(items[2])+Number(items[3])).toString())
            response.end()
        }
    },
     {
        name:"createfile",
        func: function (request,response){

            let items =request.url.split("/")

            writeFile(items[2], items[3], (err) => {
            
                console.log('createfile is done');
                response.writeHead(200)
                response.write("createfile is done")
                response.end()
            }); 

        }
    }
]

function serverCallBack(request,response){
   let found=false;
   for(let i = 0;i<controllers.length;i++){
    if(request.url.startsWith('/'+controllers[i].name)){
        found=true;
        controllers[i].func(request,response)
        break;
    }
   }
if(!found){
    response.writeHead(404)
    console.log("command not found")
    response.end()
}

   
   
}
let server = createServer(serverCallBack)
server.listen(80)
