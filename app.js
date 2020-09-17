require('log-timestamp');
var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

function getInstances() {
  var params = {
    Filters: [
      {
        Name: "instance-state-name",
        Values: [
          "running",
        ],
      },
    ],
  };

  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log("Error", err.stack);
    } else {
      console.log("Getting instances");
      data.Reservations.forEach(function(reservation) {
        reservation.Instances.forEach(function(instance) {
          console.log(`${instance.InstanceId} - ${instance.InstanceType}`);
        });
      });
    }
  });
}

getInstances();
setInterval(getInstances, 5 * 60 * 1000);
