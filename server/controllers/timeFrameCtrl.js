const mongoose = require("mongoose");
const xlsx = require('xlsx');

const Dates = require('../model/dates')
require("dotenv").config();
const csvtojson = require('csvtojson')

const getWeeklyEvents = async (req, res) => {
    res.send("This is weekly events")
}


const populatedb = async (req, res) => {
    const pathToSheet = req.file.path;
    const workbook = xlsx.readFile(pathToSheet);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
    try {
      for (const data of jsonData) {
        const employee = new Dates({
          employeeId: data['Employee ID'],
          employeeName: data['Employee Name'],
          employeeEmail: data['Employee Email'],
          dateOfBirth: data['Date of Birth'],
          dateOfJoining: data['Date of Joining'],
          favouriteColour: data['favourite Colour'],
          favouriteFood: data['favourite food'],
          placeOfInterest: data['Place of interest']
        });
  
        await employee.save();
      }
  
      console.log('Data inserted into MongoDB.');
      res.send('Data inserted into MongoDB.');
    } catch (error) {
      console.error('Error inserting data into MongoDB:', error);
      res.status(500).send('An error occurred while inserting data into MongoDB.');
    }
  };


module.exports = { getWeeklyEvents, populatedb }