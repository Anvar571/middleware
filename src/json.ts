// JSON qanday ishlashini ko'rish nodejsdagi.+

// const toString = (data: any) => {
//     if (typeof data === 'object') {
//         let jsString = '{';
//         let keys = Object.keys(data);

//         keys.forEach((key, index) => {
//             jsString += '"' + key + '":"' + data[key] + '"';
//             if (index < key.length - 1) {
//                 jsString += ",";
//             }
//             jsString += '\n';
//         })
//         jsString += "}";
//         return jsString;
//     }
//     else if (typeof data === 'string') return data;
//     else if (typeof data === 'bigint' || typeof data === 'number' || typeof data === "boolean") return data.toString();
// }
