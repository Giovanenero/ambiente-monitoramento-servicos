function parseDate(date){
    if(typeof date === "number"){
        var dateSeconds = new Date(date * 1000).toString();
        const arr = dateSeconds.split(' ');
        let month = arr[1]
        let day = arr[2]
        let year = arr[3]
        let hour = arr[4]
        
        //remove os segundos
        // var seconds = hour.lastIndexOf(":");
        // hour = hour.substring(0, seconds);

        switch(month){
            case "Jan":
                month = "01";
                break;
            case "Feb":
                month = "02";
                break;
            case "Mar":
                month = "03";
                break;
            case "Apr":
                month = "04";
                break;
            case "May":
                month = "05";
                break;
            case "Jun":
                month = "06";
                break;
            case "Jul":
                month = "07";
                break;
            case "Aug":
                month = "08";
                break;
            case "Sep":
                month = "09";
                break;
            case "Ouc":
                month = "10";
                break;
            case "Nov":
                month = "11";
                break
            default:
                month = "12";
                break;
        }

        return {
            day: day + "/" + month + "/" + year,
            hour: hour,
        }
    }
    return null;
}

function parseMemory(megabyte){
    if(typeof megabyte === "number"){
        let memoyGB = megabyte / 1000;
        return memoyGB.toFixed(2);
    }
}

const DataParse = {
    parseDate,
    parseMemory,
}

export default DataParse;