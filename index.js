import {intro, outro, select, text} from "@clack/prompts";
import pc from 'picocolors'
import axios from 'axios'
import * as fs from "fs"




const extractVideoID = (videoLink) => {
    let match = videoLink.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/i);
    return match[1]

}
intro(pc.bgGreen(`Welcome to ${pc.bgRed("ThumbDown ")} - Youtube Video Thumbnail Download`));


async function mainDownloader() {

    while( true ) {

        let options = await select({
            "message": "Pick Your Option",
            options: [
                { value: "start", label: pc.green("Start the thumbDown App")},
                {value: "close", label: pc.red("Close the thumbDown App")}
            ]
        })

        if(options == "close") {
            outro(pc.bgWhite(pc.black("thumbDown has been shut down successfully.")))
            break;
        }
        else {
            const videoLink = await text({
                "message": pc.bold(pc.blue("Please type or paste your youtube video link: ")),
                placeholder: "type video link...",
                validate(value) {
                    if (value.length === 0 ) return "Please write a valid youtube video link"
                }
            })

            const resolution = await select({

                "message": "Choose your preferred resolution",
                options: [
                    { value: "maxresdefault", label: pc.green("High Resolution: 1280 x 720 pixel")},
                    { value: "sddefault", label: pc.green("Medium Resolution: 480 x 360 pixel")},
                    { value: "default", label: pc.green("Low Resolution: 120 x 90 pixel")},
                    
                ]
            })

            let videoId = extractVideoID(videoLink)
            let img_url = "https://img.youtube.com/vi/" + videoId + "/" + resolution + ".jpg";
            let imgFileName = videoId + ".jpg";

            axios.get(img_url, {responseType: "arraybuffer"})
            .then((response) => {
                let imageBlob = response.data;
                

                fs.writeFile(imgFileName,imageBlob, (err) => {
                    if(!err) {
                        console.log("Thumbnail has been saved");
                    }
                    else {

                        console.log("Sorry we cannot downlaod this thumbnail");

                    }
                })
                
            })
            .catch((error) => {
                console.log(error);
            })



            
        }
    } 

}

mainDownloader();