const mongoose = require('mongoose');
const colors = require('colors');
const ora = require('ora');
// map global promise  -get rid of warning
mongoose.Promise = global.Promise
// connect to db

const db = mongoose.connect('mongodb://localhost:27017/customercli',{useNewUrlParser: true},{ useUnifiedTopology: true });

// IMPORT MODEL
const Customer = require('./models/customer');

// Add customer
const addCustomer = (customer)=>{
    const spinner = ora('Adding a Customer.....').start();
    try{
        Customer.create(customer).then(customer=>{
            console.info('New Customer Added'.green);
            mongoose.connection.close(()=>{
                process.exit(0);
            });
        });
        spinner.succeed("huraaay!!!");
    }catch(err){
                 console.log(err);
                 console.log("Customer cannot be Added".red);
    }
   
}


// Find customer
const findCustomer = (name)=>{
    // make case insensitive
    const search = new RegExp(name,'i');  // HERE WE HAVE USED THE REGULAR EXPRESSION CONSTRUCTOR TO SEARCH FOR BOTH CAPITAL AND SMALL (MEANS CASE INSENSITVE)
    Customer.find({$or:[{firstname:search},{lastname:search}]})
    .then(customer =>{
      console.info(customer);
      console.info(`${customer.length} matches`);
     mongoose.connection.close(()=>{
           process.exit(0);
    });
    });
}

// update the exixting customer

const updateCustomer = (_id,customer)=>{
    Customer.updateOne({_id},customer)
    .then((customer)=>{
        console.log(`Customer Updated`.green);
        mongoose.connection.close(()=>{
                 process.exit(0);
        });
    });
}

// REMOVE CUSTOMER

const removeCustomer = (_id)=>{
    Customer.remove({ _id })
    .then(()=> {
        console.log("Customer Removed Successfully".red);
        mongoose.connection.close(()=>{
               process.exit(0);
        });
    });

}

// LIST ALL CUSTOMERS

const listCustomers = ()=>{
      Customer.find()
      .then((customers)=>{
        console.info(`${customers}`.yellow)
        console.info(`${customers.length} Customers`.bgMagenta);

        mongoose.connection.close(()=>{
            process.exit(0);
        });
        
      });
} 


// export all methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}