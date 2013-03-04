var $ = require('jquery'),
    modal = require('jquery').modal;

var mongoose = require('mongoose'),
    validate = require('mongoose-validator').validate;
    //ObjectID = require('mongoose').ObjectId;

mongoose.connect('mongodb://localhost/27017');

// require('mongoose-validator').extend('isAlphanumeric', function () {
//     console.log('matt' + this.str);
//     return this.str == validate('isAlphanumeric');
// }, 'Only characters and numbers are allowed');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var objectId = new ObjectId();

var firstNameValidator  = [validate('len', 2, 50), validate('isAlphanumeric')];  
var lastNameValidator   = [validate('len', 2, 50), validate('isAlphanumeric')];  
var streetAddrValidator = [validate('len', 2, 100)]; // validate('isAlphanumeric' || 'is(/^[ ]+$/)')];  
var cityValidator       = [validate('len', 2, 50), validate('isAlphanumeric')];  
var stateValidator      = [validate('len', 2, 50), validate('isAlphanumeric')];  
var zipValidator        = [validate('len', 4, 10)]; //, validate('isNumeric')];  //validate('postalCode')];
var phoneNbrValidator   = [validate('len', 2, 20)];  //, validate('isAlphanumeric')];  
var emailValidator      = [validate('len', 6, 64), validate('isEmail')];
var amountValidator     = [validate('len', 2, 10), validate('isNumeric')];


//| validate(is(/^[ ]+$/))

var Pledge = new Schema({
      firstName     : {type: String, required: true, validate: firstNameValidator}
    , lastName      : {type: String, required: true, validate: lastNameValidator}
    , streetAddr    : {type: String, required: true, validate: streetAddrValidator}
    , city          : {type: String, required: true, validate: cityValidator}
    , state         : {type: String, required: true, validate: stateValidator} 
    , zip           : {type: Number, required: true, validate: zipValidator}
    , phoneNbr      : {type: String, required: true, validate: phoneNbrValidator}
    , email         : {type: String, required: true, validate: emailValidator}  
    , bikeEvent     : {type: String, required: false}
    , biker         : {type: String, required: false}
    , amount        : {type: Number,  required: true, validate: amountValidator }
    , paymentType   : {type: String,  required: false}
    , paymentStatus : {type: String,  required: false}
    , createDt      : Date
});

var Bike = new Schema({
      firstName     : {type: String,  required: true, validate: firstNameValidator}
    , lastName      : {type: String,  required: true, validate: lastNameValidator}
    , streetAddr    : {type: String,  required: true, validate: streetAddrValidator}
    , city          : {type: String,  required: true, validate: cityValidator}
    , state         : {type: String,  required: true, validate: stateValidator} 
    , zip           : {type: Number,  required: true, validate: zipValidator}
    , phoneNbr      : {type: String,  required: true, validate: phoneNbrValidator}
    , email         : {type: String,  required: true, validate: emailValidator}  
    , bikeEvent     : {type: String,  required: true}
    , agreement     : {type: Boolean, required: true}
    , overSixteen   : {type: Boolean, required: true}
    , birthdate     : {type: String,  required: false}
    , signature     : {type: String,  required: true}
    , shirt         : {type: String,  required: true}
    , sponsorship   : {type: String,  required: false} 
    , amount        : {type: Number,  required: true, validate: amountValidator}
    , paymentType   : {type: String,  required: false}
    , paymentStatus : {type: String,  required: false}
    , createDt      : Date
});

mongoose.model('Pledge', Pledge);
var Pledge = mongoose.model('Pledge');

Bike.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

mongoose.model('Bike', Bike);
var Bike = mongoose.model('Bike');


dbCalls = function(req, res){};
//dbCallsBike = function(req, res){};
console.log('dbCalls')


//Create a new post
dbCalls.prototype.save = function(params, callback) {
  var pledge = new Pledge({
        firstName:     params['firstName'], 
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr'], 
        bikeEvent:     params['bikeEvent'],
        biker:         params['biker'],
        amount:        params['amount'],
        paymentType:   params['paymentType'],
        paymentStatus: params['paymentStatus'],
        createDt:   new Date()});
    pledge.save(function (err) {
      if (err) {
        console.log('error dbcalls');
        callback(err, 'failed');
      } else {
        console.log('Pledge Row Id: ' + pledge.id);
        callback(null, 'saved correctly', pledge.id);
    }
  });
};

//Create a new post
dbCalls.prototype.saveBike = function(params, callback) {
  var bike = new Bike({
        firstName:     params['firstName'], 
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr'], 
        bikeEvent:     params['bikeEvent'],
        agreement:     params['agreement'],
        overSixteen:   params['overSixteen'],
        birthdate:     params['birthdate'],
        signature:     params['signature'],
        shirt:         params['shirt'],
        sponsorship:   params['sponsorship'],
        amount:        params['amount'],
        paymentType:   params['paymentType'],
        paymentStatus: params['paymentStatus'],
        createDt:   new Date()});
    rowId = bike.save(function (err) {
      if (err) {
        console.log('error bike save dbcalls');
        callback(err, 'failed', '');
      } else {
        console.log('Bike Row Id: ' + bike.id);
        callback(null, 'saved correctly', bike.id);   
    }

  });
};

//update the paymentStatus after a credit card payment is made
dbCalls.prototype.updatePaymentStatusBikes = function(rowId){
  console.log('updating the payment status');
  
  Bike.findById(rowId, function(err, biker) {
    if (err) {
      condole.log('findById error');
    } else {
      biker.paymentStatus = "Paid";

      biker.save(function(err) {
        if (err)
          console.log('biker update payment status error');
        else
          console.log('biker update payment status success');
      });
    };
  });
};

//update the paymentStatus after a credit card payment is made
dbCalls.prototype.updatePaymentStatusPledge = function(rowId){
  console.log('updating the pledger payment status');
  
  Pledge.findById(rowId, function(err, pledger) {
    if (err) {
      condole.log('findById error');
    } else {
      pledger.paymentStatus = "Paid";

      pledger.save(function(err) {
        if (err)
          console.log('pledger update payment status error');
        else
          console.log('pledger update payment status success');
      });
    };
  });
};

dbCalls.prototype.getBikerList = function( params, callback){
  console.log('test getBikerList:');
  //console.log(callback);
  Bike.find({bikeEvent: params}, {firstName: 1, lastName: 1, _id: 0}, function (error, bikersList) {  
         if(error){
          console.log('Error from dbcalls getBikerList')
          callback(error);
         }else{ 
           console.log('bikerList from dbcalls' + bikersList);
           callback(error, bikersList);
         }
  });
};

dbCalls.prototype.sendConfirmEmail = function(req){
  var email       = require("./node_modules/emailjs/email");
  var amount      = req.param('amount');
  var paymentType = req.param('paymentType');
  var biker       = req.param('biker');
  var emailParm   = req.param('email');
  var bikeEvent   = req.param('bikeEvent');

  console.log('dbCalls PaymentType:' + paymentType);
  if (paymentType == 'creditCard') {
    console.log('dbcalls credit card');
    body = 'Thank you for your generous donation for the Bike4Beds. \n' 
    if (biker.length) {
      body += 'You have chosen to sponsor ' + biker +  ' for the ' + bikeEvent + ' event.' + '\n\n' 
    };
    body += ' Your payment of: $' + amount + ' was received.' + '\n\n' +
          'Please email questions to: BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'
  } else { if (paymentType == 'Check'){
      console.log('dbcalls check');
    body = 'Thank you for your generous pledge for the Bike4Beds. ' 
    if (biker.length) {
      body += 'You have chosen to sponsor ' + biker +  ' for the ' + bikeEvent + ' event.' + '\n\n' 
    };
    body += ' Please make the check out to Bike4Beds and mail your payment of $' + amount + ' to:' + '\n\n' +
            ' Bike4Beds' + '\n' +
            ' c/o Matt Ritz' + '\n' +
            ' 229 Mountain Park Road' + '\n' +
            ' Allentown, PA 18103' + '\n\n' +
            'Please email questions to: BikeforBeds@gmail.com' + '\n' +
            'or call 610-791-1067 and ask for Matt' + '\n' +
            '' + '\n\n' +
            ' Thank You' + '\n\n' +
            ' Matt Ritz'
    }
  }

    sendConfirmEmail(body, emailParm);
};

dbCalls.prototype.sendConfirmEmailBikes = function(req){
  var amount      = req.param('amount');
  var paymentType = req.param('paymentType');
  var bikeEvent   = req.param('bikeEvent');
  var emailParm   = req.param('email');
  var body        = ''

  console.log('dbCalls PaymentType:' + paymentType);
  if (paymentType == 'creditCard') {
    console.log('dbcalls credit card');
    body = 'Thank you for signing up for the Bike4Beds ' + bikeEvent + ' event.' + '\n\n' +
          ' Your payment of: $' + amount + ' was received.' + '\n\n' +
          'Please email questions to: BikeforBeds.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'
  } else { if (paymentType == 'Check'){
      console.log('dbcalls check');
      body = 'Thank you for signing up for the Bike4Beds ' + bikeEvent + ' event.' + '\n\n' +
          ' Please make the check out to Bike4Beds and mail your payment of $' + amount + ' to:' + '\n\n' +
          ' Bike4Beds' + '\n' +
          ' c/o Matt Ritz' + '\n' +
          ' 229 Mountain Park Road' + '\n' +
          ' Allentown, PA 18103' + '\n\n' +
          'Please email questions to: BikeforBeds.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n\n' +
          ' Matt Ritz'
    }
  }

  // //sendConfirmEmail(body, emailParm);
  // var email = require("./node_modules/emailjs/email");
  // var server  =    email.server.connect({
  //    user:    "bikeforbeds", 
  //    password:"bike4beds100", 
  //    host:    "smtp.gmail.com", 
  //    ssl:     true
  //   });

  //   // send the message and get a callback with an error or details of the message that was sent
  //   server.send({
  //      text:    body, 
  //      from:    "bike4beds <bikeforbeds@gmail.com>", 
  //      to:      emailParm,
  //      cc:      "bike4beds <bikeforbeds@gmail.com>",
  //      subject: 'Bike4Beds'
  //   }, function(err, message) { console.log(err || message); });

    sendConfirmEmail(body, emailParm);
};

function sendConfirmEmail(body, emailParm) {
  var email = require("./node_modules/emailjs/email");
  var server  =    email.server.connect({
     user:    "bikeforbeds", 
     password:"bike4beds100", 
     host:    "smtp.gmail.com", 
     ssl:     true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
       text:    body, 
       from:    "bike4beds <bikeforbeds@gmail.com>", 
       to:      emailParm,
       cc:      "bike4beds <bikeforbeds@gmail.com>",
       subject: 'Bike4Beds'
    }, function(err, message) { console.log(err || message); });
};

exports.dbCalls = dbCalls;
