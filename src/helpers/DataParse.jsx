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

function treatData(data){
    const treatTime = (date) => {
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let clock = date.slice(11);
        return {
            day: day + "/" + month + "/" + year,
            clock: clock,
        }
    }
    if(data !== ""){
        let lines = [];
        let first = 0;
        let last = data.indexOf("at ");
        lines.push(data.slice(first, last));
        first = last + 3;
        last = data.indexOf("at ", first);
        while(last !== -1){
            lines.push("at "+ data.slice(first, last));
            first = last + 3;
            last = data.indexOf("at ", first);
        }
        let date = treatTime(lines[0].slice(0, 19));
        return {
            lines: lines,
            day: date.day,
            clock: date.clock,
        }
    } return null;
}

const DataParse = {
    parseDate,
    parseMemory,
    treatData,
}

export default DataParse;