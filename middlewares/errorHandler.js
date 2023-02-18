const { constants } = require("../constants");

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  switch(statusCode) {
    case constants.VALIDATION_ERROR:
      response.json({ 
        title: "Validation Failed",
        message: error.message, 
        stackTrace: error.stackTrace 
      });
      break;
    
    case constants.NOT_FOUND:
      response.json({ 
        title: "Not Found",
        message: error.message, 
        stackTrace: error.stackTrace 
      });
      break;

    case constants.UNAUTHORIZED:
      response.json({ 
        title: "Unauthorized",
        message: error.message, 
        stackTrace: error.stackTrace 
      });
      break;
        
    case constants.FORBIDDEN:
      response.json({ 
        title: "Forbidden",
        message: error.message, 
        stackTrace: error.stackTrace 
      });
      break;
      
    case constants.SERVER_ERROR:
      response.json({ 
        title: "Server Error",
        message: error.message, 
        stackTrace: error.stackTrace 
      });
      break;

    default:
      console.log("No Errors")
      break;
  }
};

module.exports = errorHandler;
