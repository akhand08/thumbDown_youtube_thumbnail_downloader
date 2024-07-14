import {intro, outro, select, text} from "@clack/prompts";
import pc from 'picocolors'
import axios from 'axios'


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

            console.log(videoLink);
        }
    } 

}

mainDownloader();