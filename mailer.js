
/* Application for command line Url opener
	creator:Manish Kakoti
	published on :Github
	 */

var spawn = require('child_process').spawn;

var command;

switch(process.platform) {
	
	case  'linux':
		command = 'xdg-open';
		break;

	case 'win32':
		command = 'explorer.exe';

	default:
		throw new Error('Unsupported Platform'+process.platform);

}

function open(url, callback) {
    var child = spawn(command, [url]);
    var errorText = "";
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        errorText += data;
    });
    child.stderr.on('end', function () {
        if (errorText.length > 0) {
            var error = new Error(errorText);
            if (callback) {
                callback(error);
            } else {
                throw error;
            }
        } else if (callback) {
            callback(error);
        }
    });
}





function mailer(recipients,fields,recipientsSeparator,callback)
{
	recipientsSeparator = recipientsSeparator || ",";
	var url = "mailer:"+recipients.join(recipientsSeparator);
	Object.keys(fields).forEach(function (key,index){
		if (index==0){
			url+="?";
			}

		else
			{

				url+="&";
			}

			url+=key+"="+encodedURIComponent(fields[key]);

	});

open(url, callback);

}
exports.open = open;
exports.mailer = mailer;