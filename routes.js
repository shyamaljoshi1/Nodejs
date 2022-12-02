const fs= require('fs')

const requestHandler = (req,res) => {
    const url=req.url
    const method=req.method

    if(url==='/'){
        res.write('<html>');
        res.write('<head></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send Message</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url==='/message' && method==='POST'){
        const body=[]
        req.on('data',(chunk)=> body.push(chunk))
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            // console.log(parsedBody) output will be in form of message = <writen text>
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })

        
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.end('<h1>Hello World</h1>');
}

module.exports=requestHandler;
