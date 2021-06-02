function get_url_param( name )
{
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

    var regexS = "[\\?&amp;]"+name+"=([^&amp;#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );

    if ( results == null )
        return "";
    else
        return results[1];
}

let stationName = get_url_param('station')
let html="";

fetch('./assets/json/station1.json')
    .then(res => res.json())
    .then(data => {
        markArr = []
        for (let i=0; i<data.length;i++){
            if (data[i].STATION===stationName){
                console.log(data[i].DATA)
                html+=" <p>"+stationName+"</p><table>\n" +
                    "  <tr>\n" +
                    "    <th>DATE</th>\n" +
                    "    <th>DP01</th>\n" +
                    "  </tr>\n" +
                    "  <tr>\n" +
                    "    <td>"+data[i].DATA[0].DATE+"</td>\n" +
                    "    <td>"+data[i].DATA[0].DP01+"</td>\n" +
                    "  </tr>\n" +
                    "  <tr>\n" +
                    "    <td>"+data[i].DATA[1].DATE+"</td>\n" +
                    "    <td>"+data[i].DATA[1].DP01+"</td>\n" +
                    "  </tr>\n" +
                    "</table> "
                document.getElementById("content").innerHTML = html
            }
        }
    })
    .catch(err => console.error(err));