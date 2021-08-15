#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');


const pkg = require('./package.json'); //this is for getting the version from the package .json instead of hard codeing it
const {addCustomer,findCustomer,updateCustomer,removeCustomer,listCustomers} = require('./index');
program.version(pkg.version).description('Customer Mangement System')

// CUSTOMER QUESTIONS

const questions = [
    {
        type:'input',
        name:'firstname',
        message:'Customer First Name'
    }, 
    {
        type:'input',
        name:'lastname',
        message:'Customer Last Name'
    }, 
    {
        type:'input',
        name:'phone',
        message:'Customer Phone Number'
    }, 
    {
        type:'input',
        name:'email',
        message:'Customer Email Address'
    }, 
]


// ADD COMMANDS
program
.command('add')
.alias('a')
.description('Add a Customer')
.action(()=>{
    prompt(questions).then(answers=>addCustomer(answers));
});


// program    //BEFORE INQUIRER WE ARE USING THIS COMMANDS
// .command('add <firstnsme> <lastname> <phone> <email>')
// .alias('a')
// .description('Add a Customer')
// .action((firstname,lastname,phone,email)=>{
//     addCustomer({firstname,lastname,phone,email});
// })   


// FIND COMMANDS
program
.command('find <name>')
.alias('f')
.description('Find a Customer')
.action((name)=>{
    findCustomer(name);
})

// UPDATE COMMANDS

program
.command('update <_id>')
.alias('u')
.description('Update The Existing Customer')
.action(_id=>{
    console.info("Enter The Changed Values")
    prompt(questions).then((answers)=>{
           updateCustomer(_id,answers);
    });
});

// REMOVE COMMANDS

program
.command('remove <_id>')
.alias('rm')
.description('Remove a Customer')
.action(_id => removeCustomer(_id));

program
.command('list')
.alias('l')
.description('Lists All The Customers')
.action(()=> listCustomers());
     
program.parse(process.argv);