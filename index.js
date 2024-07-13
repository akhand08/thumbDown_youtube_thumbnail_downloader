import {intro, outro, select} from "@clack/prompts";
import pc from 'picocolors'


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
            console.log("Working");
        }
    } 

}

mainDownloader();