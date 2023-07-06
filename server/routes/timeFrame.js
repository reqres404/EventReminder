const express = require('express')
const multer = require('multer')
const router = express.Router();
const {getWeeklyEvents,populatedb} = require('../controllers/timeFrameCtrl');

var excelStorage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
         cb(null,'./public/excelUploads');      // file added to the public folder of the root directory
    },  
    filename:(req,file,cb)=>{  
         cb(null,file.originalname);  
    }  
});  
var excelUploads = multer({storage:excelStorage}); 

router.post("/populatedb", excelUploads.single("uploadfile"),populatedb)
router.get("/weekly",getWeeklyEvents)

module.exports = router