const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./result.json"));

let string = "enum IPhoneDevice{ \n";

for (let row of data) {
  string += `\tcase ${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}\n`;
}

/*
    var width: CGFloat {
        switch self {
        case .iPad1stgen
        }
    }

*/

string += "\n";
string += `var logicalWidth: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.LogicalWidth}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var logicalHeight: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.LogicalHeight}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var physicalWidth: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.PhysicalWidth}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var physicalHeight: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.PhysicalHeight}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var ppi: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.PPI}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var scaleFactor: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.ScaleFactor}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var screenDiagonal: CGFloat {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return ${row.ScreenDiagonal}\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n";
string += `var release: String {\nswitch self {\n`;

for (let row of data) {
  string += `\tcase .${row.Model.trim()
    .replace(/ /g, "")
    .replace(".", "_")
    .replace(/[^a-zA-Z0-9_]/g, "")}: return "${row.Release}"\n`;
}

string += "\n\t\t}\n\t}\n";

///////////////////////////////////////////////////////////////////////////////

string += "\n}";
console.log(string);
